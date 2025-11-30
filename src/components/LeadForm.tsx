"use client";

import React, { useState, FormEvent } from "react";
import { Location } from "@/src/data/locations";
import { services } from "@/src/data/services";

interface LeadFormProps {
  city?: string;
  state?: string;
  citySlug?: string;
  stateSlug?: string;
  serviceContext?: string;
  className?: string;
}

export default function LeadForm({
  city,
  state,
  citySlug,
  stateSlug,
  serviceContext,
  className = "",
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    zipCode: "",
    serviceType: serviceContext || "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      return false;
    }
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number.");
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const WEB3FORMS_ACCESS_KEY = "e26bbf73-c42c-459e-b792-de51a4d328b2";
      const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

      const leadSource =
        city && state
          ? `Yard Maintenance Quotes - ${city}, ${state}`
          : "Yard Maintenance Quotes";

      const submissionData = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Lead: ${leadSource}`,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address || "",
        zip_code: formData.zipCode || "",
        service_type: formData.serviceType || "",
        message: formData.message || "",
        city: city || "",
        state: state || "",
        city_slug: citySlug || "",
        state_slug: stateSlug || "",
        lead_source: leadSource,
        page_url: typeof window !== "undefined" ? window.location.href : "",
        from_name: "Yard Maintenance Quotes",
      };

      console.log("Submitting form data:", { ...submissionData, access_key: "***" });

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      console.log("Response status:", response.status);

      const result = await response.json();
      console.log("Response data:", result);

      if (result.success) {
        setSubmitStatus("success");

        // TODO: Add CRM webhook call here
        // Example: await fetch(CRM_WEBHOOK_URL, { method: 'POST', body: JSON.stringify(submissionData) });
        // Route based on city/service: if (citySlug === 'tucson' && serviceType === 'lawn-mowing') { ... }

        // TODO: Fire GA4 / Google Ads conversion tracking
        // Example:
        // if (typeof window !== 'undefined' && window.dataLayer) {
        //   window.dataLayer.push({
        //     event: 'conversion',
        //     conversion_type: 'form_submission',
        //     lead_source: leadSource,
        //   });
        // }

        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          zipCode: "",
          serviceType: serviceContext || "",
          message: "",
        });

        // Optional: Redirect to thank you page after a delay
        // setTimeout(() => {
        //   window.location.href = '/thank-you';
        // }, 2000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          result.message || "Something went wrong. Please try again or call us directly."
        );
        console.error("Form submission failed:", result);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? `Error: ${error.message}`
          : "Network error. Please check your connection and try again."
      );
      setErrorMessage("Network error. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div
        className={`bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center ${className}`}
      >
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-700">
          We have received your request. A local yard maintenance professional
          will contact you shortly with a free quote.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100 ${className}`}
    >
      {/* Honeypot field - hidden from users */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        defaultChecked={false}
      />

      <div className="mb-8 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          Get Your Free Quote
        </h3>
        <p className="text-gray-600">Fill out the form below to get started</p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address (Optional)
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Street address"
          />
        </div>

        <div>
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="12345"
          />
        </div>

        <div>
          <label
            htmlFor="serviceType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Service Type
          </label>
          <select
            id="serviceType"
            value={formData.serviceType}
            onChange={(e) =>
              setFormData({ ...formData, serviceType: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select a service...</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tell us about your yard
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Size, current condition, specific needs, etc."
          />
        </div>

        {(city || state) && (
          <>
            <input type="hidden" name="city" value={city || ""} />
            <input type="hidden" name="state" value={state || ""} />
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Get My Free Quote"
          )}
        </button>
      </div>

      <p className="mt-4 text-xs text-gray-500 text-center">
        By submitting this form, you agree to be contacted by local yard
        maintenance professionals. No spam, no obligation.
      </p>
    </form>
  );
}
