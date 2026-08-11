/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PopularServices } from './components/PopularServices';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { ServiceAssistant } from './components/ServiceAssistant';
import { DocumentHelper } from './components/DocumentHelper';
import { AboutUs } from './components/AboutUs';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PosterReferenceBanner } from './components/PosterReferenceBanner';
import { AnnouncementBar } from './components/AnnouncementBar';
import { ServiceItem } from './data/services';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ServiceRequest } from './types';

// Admin Views
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout, AdminTab } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminRequests } from './admin/AdminRequests';
import { AdminServices } from './admin/AdminServices';
import { AdminAnnouncements } from './admin/AdminAnnouncements';
import { AdminSettings } from './admin/AdminSettings';
import { AdminAnalytics } from './admin/AdminAnalytics';

import { checkIsAdminAuthenticated } from './data/store';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Admin Routing & Auth State
  const [isAdminPath, setIsAdminPath] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<ServiceRequest | null>(null);

  // Sync Hash / Route
  useEffect(() => {
    const handleLocationCheck = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      const isAdmin = hash.startsWith('#admin') || path.startsWith('/admin');
      setIsAdminPath(isAdmin);

      if (hash.includes('requests')) setAdminTab('requests');
      else if (hash.includes('services')) setAdminTab('services');
      else if (hash.includes('announcements')) setAdminTab('announcements');
      else if (hash.includes('settings')) setAdminTab('settings');
      else if (hash.includes('analytics')) setAdminTab('analytics');
      else if (isAdmin) setAdminTab('dashboard');

      setIsAdminAuth(checkIsAdminAuthenticated());
    };

    handleLocationCheck();
    window.addEventListener('hashchange', handleLocationCheck);
    window.addEventListener('popstate', handleLocationCheck);
    window.addEventListener('tds_auth_updated', handleLocationCheck);

    return () => {
      window.removeEventListener('hashchange', handleLocationCheck);
      window.removeEventListener('popstate', handleLocationCheck);
      window.removeEventListener('tds_auth_updated', handleLocationCheck);
    };
  }, []);

  // Public Scroll Spy
  useEffect(() => {
    if (isAdminPath) return;

    const handleScroll = () => {
      const sections = ['home', 'popular-services', 'services', 'service-request-form', 'document-helper', 'faq', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminPath]);

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleScrollToRequestForm = () => {
    const elem = document.getElementById('service-request-form');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToPublicSite = () => {
    window.location.hash = '';
    setIsAdminPath(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // RENDER ADMIN PORTAL IF ON ADMIN ROUTE
  if (isAdminPath) {
    if (!isAdminAuth) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAdminAuth(true)}
          onGoBack={handleGoToPublicSite}
        />
      );
    }

    return (
      <AdminLayout
        activeTab={adminTab}
        onTabChange={(tab) => {
          setAdminTab(tab);
          window.location.hash = `admin/${tab}`;
        }}
        onLogout={() => {
          setIsAdminAuth(false);
          handleGoToPublicSite();
        }}
        onViewPublicSite={handleGoToPublicSite}
      >
        {adminTab === 'dashboard' && (
          <AdminDashboard
            onNavigateToRequests={() => {
              setAdminTab('requests');
              window.location.hash = 'admin/requests';
            }}
            onNavigateToServices={() => {
              setAdminTab('services');
              window.location.hash = 'admin/services';
            }}
            onSelectRequestDetails={(req) => {
              setSelectedRequestDetails(req);
              setAdminTab('requests');
              window.location.hash = 'admin/requests';
            }}
          />
        )}

        {adminTab === 'requests' && (
          <AdminRequests initialSelectedRequest={selectedRequestDetails} />
        )}

        {adminTab === 'services' && <AdminServices />}

        {adminTab === 'announcements' && <AdminAnnouncements />}

        {adminTab === 'settings' && <AdminSettings />}

        {adminTab === 'analytics' && <AdminAnalytics />}
      </AdminLayout>
    );
  }

  // RENDER PUBLIC WEBSITE
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Hind_Siliguri','Noto_Sans_Bengali',sans-serif] overflow-x-hidden pb-16 sm:pb-0">
      {/* Top Dynamic Announcement Bar */}
      <AnnouncementBar />

      {/* Header Navigation */}
      <Header activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Banner */}
        <Hero />

        {/* Popular Services Section */}
        <PopularServices onSelectService={handleSelectService} />

        {/* Central & State Government Services with Filter & Search */}
        <ServicesSection />

        {/* Instant Application Assistant & Service Request Form */}
        <ServiceAssistant />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* How It Works - 4 Easy Steps */}
        <HowItWorks />

        {/* Document Requirements Checklist */}
        <DocumentHelper />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* About Us */}
        <AboutUs />

        {/* Contact Section & Google Map */}
        <ContactSection />

        {/* Pre-Footer Call to Action */}
        <ContactCTA />
      </main>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      {/* Poster Reference Floating Trigger Modal */}
      <PosterReferenceBanner />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Mobile Fixed Bottom Nav & Desktop Floating Request Trigger */}
      <MobileBottomNav onRequestClick={handleScrollToRequestForm} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
