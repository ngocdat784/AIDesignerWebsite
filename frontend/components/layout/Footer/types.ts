import type { ComponentType } from "react";

export interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  name: string;
  href: string;
  icon: ComponentType<{
    className?: string;
  }>;
}

export interface FooterBrand {
  name: string;

  subtitle?: string;

  description: string;

  badge?: string;

  logo?: string;
}

export interface FooterNewsletter {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
}

export interface FooterBottomLink {
  title: string;
  href: string;
}

export interface FooterBottom {
  copyright: string;
  links: FooterBottomLink[];
}

export interface FooterPaymentMethod {
  name: string;
  image: string;
}

export interface FooterAppDownload {
  name: string;
  image: string;
  href: string;
}

export interface FooterData {
  brand: FooterBrand;
  sections: FooterSection[];
  socials: FooterSocial[];
  newsletter: FooterNewsletter;
  bottom: FooterBottom;
  paymentMethods?: FooterPaymentMethod[];
  appDownloads?: FooterAppDownload[];
}