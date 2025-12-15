from fastapi import APIRouter, HTTPException, status
from app.schemas.user import NINLookupRequest, NINLookupResponse
from app.services.user_service import lookup_nin_external

ninRouter = APIRouter(prefix="/nin", tags=["NIN Verification"])


@ninRouter.post("/lookup", response_model=NINLookupResponse, status_code=status.HTTP_200_OK)
async def lookup_nin(nin_request: NINLookupRequest):
    """
    Lookup user details using NIN from LumiID API.
    
    This endpoint queries LumiID verification service using the provided NIN
    and returns the user's personal details without saving any information to the database.
    
    Args:
        nin_request: Request body containing the NIN to lookup
        
    Returns:
        NINLookupResponse with success status and user details if found
        
    Raises:
        HTTPException: If NIN format is invalid, not found, or service is unavailable
    """
    try:
        # Call LumiID API to verify NIN and get details
        external_response = await lookup_nin_external(nin_request.nin)
        
        # Extract personal details from LumiID response
        # LumiID response format: {'status': 'success', 'data': {...}}
        if external_response.get('status') == 'success':
            lumiid_data = external_response.get('data', {})
            residence_data = lumiid_data.get('residence', {})
            next_of_kin_data = lumiid_data.get('next_of_kin', {})
            
            return {
                "success": True,
                "message": external_response.get('message', 'NIN verified successfully'),
                "data": {
                    "nin": lumiid_data.get('nin'),
                    "first_name": lumiid_data.get('firstname'),
                    "last_name": lumiid_data.get('lastname'),
                    "middle_name": lumiid_data.get('middlename'),
                    "date_of_birth": lumiid_data.get('birthdate'),
                    "gender": lumiid_data.get('gender'),
                    "phone_number": lumiid_data.get('phone'),
                    "email": lumiid_data.get('email'),
                    "photo": lumiid_data.get('photo'),
                    "residence": {
                        "address1": residence_data.get('address1'),
                        "address2": residence_data.get('address2'),
                        "town": residence_data.get('town'),
                        "lga": residence_data.get('lga'),
                        "state": residence_data.get('state')
                    } if residence_data else None,
                    "title": lumiid_data.get('title'),
                    "profession": lumiid_data.get('profession'),
                    "marital_status": lumiid_data.get('marital_status'),
                    "employment_status": lumiid_data.get('employment_status'),
                    "birth_state": lumiid_data.get('birth_state'),
                    "birth_country": lumiid_data.get('birth_country'),
                    "next_of_kin": {
                        "firstname": next_of_kin_data.get('firstname'),
                        "lastname": next_of_kin_data.get('lastname'),
                        "middlename": next_of_kin_data.get('middlename'),
                        "address1": next_of_kin_data.get('address1'),
                        "address2": next_of_kin_data.get('address2'),
                        "lga": next_of_kin_data.get('lga'),
                        "state": next_of_kin_data.get('state'),
                        "town": next_of_kin_data.get('town')
                    } if next_of_kin_data else None,
                    "nspokenlang": lumiid_data.get('nspokenlang'),
                    "religion": lumiid_data.get('religion'),
                    "lga_of_origin": lumiid_data.get('lga_of_origin'),
                    "place_of_origin": lumiid_data.get('place_of_origin'),
                    "state_of_origin": lumiid_data.get('state_of_origin'),
                    "signature": lumiid_data.get('signature'),
                    "tracking_id": lumiid_data.get('tracking_id')
                }
            }
        else:
            return {
                "success": False,
                "message": external_response.get('message', 'NIN verification failed'),
                "data": None
            }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {str(e)}"
        )
