import React from "react"
import Link from "next/link"
import { FooterLinks, FooterSocialLinks, FooterSubLinks } from "@/data"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterSection = () => {
    return (
        <footer className="border-t border-gray-200 py-10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4">
                        <Link
                            href="/"
                            className="text-xl font-bold"
                            scroll={false}
                        >
                            HOM
                            <span className="text-secondary-500 font-normal hover:!text-primary-300">
                                IGO
                            </span>
                        </Link>
                    </div>
                    <nav className="mb-4">
                        <ul className="flex space-x-6">
                            {FooterLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.linkHref}
                                        className="font-bold hover:text-secondary-500"
                                    >
                                        {link.linkText}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="flex space-x-4 mb-4">
                        {FooterSocialLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.linkHref}
                                aria-label={link.linkText}
                                className="hover:text-secondary-500"
                            >
                                <FontAwesomeIcon icon={link.icon} className="size-6" />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="text-center text-sm text-gray-500 flex justify-center space-x-4">
                    <span>&copy; HOMIGO. All rights reserved.</span>
                    {FooterSubLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.linkHref}
                            className="hover:text-secondary-500"
                        >
                            {link.linkText}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default FooterSection

