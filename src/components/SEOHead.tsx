import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

const SEOHead = ({ 
  title = "Trần Bảo Ngọc - Trợ lý Ban Điều Hành | Quan hệ Quốc tế | Phiên dịch",
  description = "Portfolio của Trần Bảo Ngọc — Trợ lý Ban Điều Hành, chuyên viên Quan hệ Quốc tế và Phiên dịch, hỗ trợ lãnh đạo, điều phối đối tác quốc tế và triển khai các dự án dành cho thanh niên.",
  keywords = "Trần Bảo Ngọc, Trợ lý Ban Điều Hành, Quan hệ Quốc tế, Interpreter, Phiên dịch, Hỗ trợ lãnh đạo, International Relations, Executive Assistant Vietnam, Youth Empowerment, Coordinator",
  image = "/profile.jpg",
  type = "website"
}: SEOHeadProps) => {
  const location = useLocation();
  const baseUrl = "https://trinhbalam.id.vn";
  const currentUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    document.title = title;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Basic meta
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", "Trần Bảo Ngọc");

    // OG
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:image", `${baseUrl}${image}`, true);
    updateMetaTag("og:site_name", "Portfolio Trần Bảo Ngọc", true);
    updateMetaTag("og:locale", "vi_VN", true);

    // Twitter
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", `${baseUrl}${image}`);

    // Extra SEO
    updateMetaTag("robots", "index, follow");
    updateMetaTag("language", "Vietnamese");
    updateMetaTag("revisit-after", "7 days");
    updateMetaTag("geo.region", "VN");
    updateMetaTag("geo.placename", "Vietnam");

    // Canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);

    // JSON-LD Person Schema
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Trần Bảo Ngọc",
      "jobTitle": "Executive Assistant, International Relations Specialist, Interpreter",
      "description": description,
      "url": baseUrl,
      "image": `${baseUrl}${image}`,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "VN"
      },
      "sameAs": [
        // sau này load dynamic từ DB
      ],
      "knowsAbout": [
        "Executive Assistance",
        "Board Support",
        "International Relations",
        "Cross-cultural Communication",
        "Interpretation",
        "Event Coordination",
        "Youth Empowerment Projects",
        "Partnership Development"
      ],
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Foreign Trade University (FTU)",
        "address": "Hà Nội, Việt Nam"
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, type, location.pathname]);

  return null;
};

export default SEOHead;
