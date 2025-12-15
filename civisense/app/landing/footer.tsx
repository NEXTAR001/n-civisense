'use client';

import React from "react";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";
/* ----------------- Footer Components ------------------ */

function FooterSection({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) {
    return (
        <div>
            <h4 className="text-lg font-bold text-green-700 mb-4">{title}</h4>
            <ul className="space-y-2">{children}</ul>
        </div>
    );
}

function FooterLink({ label }: { label: string }) {
    return (
        <li>
            <a
                href="#"
                className="text-gray-700 hover:text-green-700 text-sm transition-colors"
            >
                {label}
            </a>
        </li>
    );
}

function FooterBottomLink({ label }: { label: string }) {
    return (
        <a
            href="#"
            className="text-gray-700 hover:text-green-700 text-sm transition-colors"
        >
            {label}
        </a>
    );
}

function SocialLink({ icon, label }: { icon?: React.ReactNode; label: string }) {
    return (
        <li>
            <a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-green-700 text-sm transition-colors"
            >
                {icon}
                <span>{label}</span>
            </a>
        </li>
    );
}


export default function BannerAndFooter() {
    const { t } = useLanguage();
    
    return (
        <div className="pt-32 flex flex-col">
            <div className="flex-grow" />

            {/* CTA Banner */}
            <section className="bg-[#2F7C4C] py-16 px-4">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight text-center lg:text-left">
                        {t('footer.cta.title1')} <br className="hidden lg:block" />
                        {t('footer.cta.title2')}
                    </h2>

                    <button className="bg-[#16A34A] hover:bg-[#12863F] text-white font-semibold text-lg md:text-xl px-10 py-4 rounded-lg transition-colors shadow-md">
                        {t('footer.cta.button')}
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Main Footer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                        {/* Brand */}
                        <div className="lg:col-span-1">
                            <h3 className="text-2xl font-bold text-green-700 mb-4">
                                {t('footer.brand.name')}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('footer.brand.tagline')}
                            </p>
                        </div>

                        {/* Quick Links */}
                        <FooterSection title={t('footer.links.title')}>
                            {[
                                t('footer.links.home'),
                                t('footer.links.services'),
                                t('footer.links.about'),
                                t('footer.links.contact')
                            ].map((item) => (
                                <FooterLink key={item} label={item} />
                            ))}
                        </FooterSection>

                        {/* Key Initiatives */}
                        <FooterSection title={t('footer.initiatives.title')}>
                            {[
                                t('footer.initiatives.healthPrograms'),
                                t('footer.initiatives.educationSupport'),
                                t('footer.initiatives.agricultureSupport'),
                            ].map((item) => (
                                <FooterLink key={item} label={item} />
                            ))}
                        </FooterSection>

                        {/* Contact */}
                        <FooterSection title={t('footer.contact.title')}>
                            <SocialLink label={t('footer.contact.email')} />
                            <SocialLink label={t('footer.contact.phone')} />
                        </FooterSection>

                        {/* Legal */}
                        <FooterSection title={t('footer.legal.title')}>
                            <FooterLink label={t('footer.legal.terms')} />
                            <FooterLink label={t('footer.legal.privacy')} />
                            <FooterLink label={t('footer.legal.cookies')} />
                        </FooterSection>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-200 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-gray-600">
                                {t('footer.copyright')}
                            </p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-gray-500 hover:text-green-700 transition-colors" aria-label="Facebook">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-green-700 transition-colors" aria-label="Instagram">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-green-700 transition-colors" aria-label="LinkedIn">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                            <FooterBottomLink label="Privacy Policy" />
                            <FooterBottomLink label="Terms of Service" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
