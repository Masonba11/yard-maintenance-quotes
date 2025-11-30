import { Location } from "@/src/data/locations";
import { Service } from "@/src/data/services";

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateLocationFAQs(location: Location): FAQItem[] {
  return [
    {
      question: `How much does yard maintenance cost in ${location.city}, ${location.state}?`,
      answer: `Yard maintenance costs in ${location.displayName} vary based on property size, service frequency, and specific needs. Our free quote service connects you with 2-4 local professionals who will provide detailed, no-obligation quotes tailored to your property. Most homeowners in ${location.city} receive quotes within 24 hours.`,
    },
    {
      question: `What yard maintenance services are available in ${location.displayName}?`,
      answer: `Professional yard maintenance services in ${location.city} include lawn mowing, yard cleanup, bush and hedge trimming, weed removal, leaf removal, and basic landscaping maintenance. Local professionals in ${location.state} understand the area's climate and can provide services suited to ${location.metroArea} conditions.`,
    },
    {
      question: `How quickly can I get yard maintenance quotes in ${location.city}?`,
      answer: `Most homeowners in ${location.displayName} receive their first quote within 24 hours of submitting a request. Some professionals may contact you the same day. Our network of pre-screened local professionals in ${location.state} is committed to quick response times.`,
    },
    {
      question: `Are yard maintenance professionals in ${location.city} licensed and insured?`,
      answer: `Yes, all professionals in our network serving ${location.displayName} are pre-screened for licensing and insurance. We verify credentials before connecting homeowners with professionals to ensure quality and protection for your property.`,
    },
    {
      question: `What makes yard maintenance in ${location.state} different from other states?`,
      answer: `Yard maintenance in ${
        location.state
      } requires understanding of local climate patterns, soil conditions, and seasonal changes specific to the ${
        location.metroArea
      } area. Professionals serving ${
        location.city
      } are familiar with regional challenges like ${
        location.state === "Arizona"
          ? "drought conditions and desert landscaping"
          : location.state === "Florida"
          ? "high humidity and frequent rainfall"
          : location.state === "Texas"
          ? "extreme heat and variable weather"
          : "local growing seasons and weather patterns"
      }, ensuring appropriate care for your yard.`,
    },
    {
      question: `Can I get quotes for both one-time and ongoing yard maintenance in ${location.city}?`,
      answer: `Absolutely. Whether you need a one-time ${
        location.city === "Tucson" ? "desert cleanup" : "yard cleanup"
      } or regular ongoing maintenance, our network of professionals in ${
        location.displayName
      } can provide quotes for both. Simply specify your needs when submitting your request.`,
    },
    {
      question: `Do yard maintenance professionals in ${location.displayName} offer seasonal services?`,
      answer: `Yes, many professionals serving ${location.city} offer seasonal services tailored to ${location.state}'s climate. This includes spring cleanup, summer maintenance, fall leaf removal, and winter preparation. Local professionals understand the seasonal needs specific to the ${location.metroArea} area.`,
    },
    {
      question: `Is there an obligation to accept quotes from ${location.city} professionals?`,
      answer: `No, there is absolutely no obligation. You can review all quotes from professionals in ${location.displayName}, ask questions, compare options, and choose the best fit for your needs and budget. If none of the options work for you, you're under no obligation to proceed.`,
    },
  ];
}

export function generateServiceFAQs(service: Service): FAQItem[] {
  return [
    {
      question: `How much does ${service.name.toLowerCase()} cost?`,
      answer: `${
        service.name
      } costs vary based on property size, frequency, and specific requirements. Our free quote service connects you with 2-4 local professionals who specialize in ${service.name.toLowerCase()} and will provide detailed, no-obligation quotes. Most homeowners receive quotes within 24 hours.`,
    },
    {
      question: `What's included in professional ${service.name.toLowerCase()} services?`,
      answer: `Professional ${service.name.toLowerCase()} typically includes ${service.description.toLowerCase()}. Our network of licensed professionals provides comprehensive service with proper equipment, techniques, and cleanup. Each professional will detail exactly what's included in their quote.`,
    },
    {
      question: `How often should I schedule ${service.name.toLowerCase()}?`,
      answer: `The frequency of ${service.name.toLowerCase()} depends on your property size, grass type, climate, and personal preferences. Most homeowners benefit from ${
        service.id === "lawn-mowing"
          ? "weekly or bi-weekly service during growing seasons"
          : service.id === "yard-cleanup"
          ? "seasonal or quarterly cleanups"
          : "regular maintenance schedules"
      }. Professional providers can assess your needs and recommend an appropriate schedule.`,
    },
    {
      question: `Are ${service.name.toLowerCase()} professionals licensed and insured?`,
      answer: `Yes, all professionals in our network specializing in ${service.name.toLowerCase()} are pre-screened for licensing and insurance. We verify credentials before connecting homeowners with professionals to ensure quality service and property protection.`,
    },
    {
      question: `Can I get quotes for both one-time and ongoing ${service.name.toLowerCase()}?`,
      answer: `Absolutely. Whether you need a one-time ${service.name.toLowerCase()} project or regular ongoing service, our network of professionals can provide quotes for both. Simply specify your needs when submitting your request, and professionals will tailor their quotes accordingly.`,
    },
    {
      question: `What equipment do professionals use for ${service.name.toLowerCase()}?`,
      answer: `Professional ${service.name.toLowerCase()} providers use commercial-grade equipment designed for efficiency and quality results. This includes ${
        service.id === "lawn-mowing"
          ? "professional mowers with sharp blades, edgers, and trimmers"
          : service.id === "bush-trimming"
          ? "hedge trimmers, pruning shears, and safety equipment"
          : "appropriate tools and equipment"
      } specific to ${service.name.toLowerCase()}. Professional equipment ensures better results than typical homeowner tools.`,
    },
    {
      question: `How do I know if I need professional ${service.name.toLowerCase()}?`,
      answer: `If you're spending significant time on ${service.name.toLowerCase()}, lack the proper equipment, want consistent professional results, or prefer to focus on other priorities, professional ${service.name.toLowerCase()} may be right for you. Our free quote service lets you explore options with no obligation.`,
    },
    {
      question: `What should I expect from professional ${service.name.toLowerCase()}?`,
      answer: `Professional ${service.name.toLowerCase()} providers deliver thorough, efficient work with proper techniques and equipment. They'll clean up after completing the work, communicate clearly about services, and typically offer insurance coverage and warranties. Professional service ensures your property looks its best with minimal effort on your part.`,
    },
  ];
}

export function generateLocationServiceFAQs(
  location: Location,
  service: Service
): FAQItem[] {
  return [
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${
        location.city
      }, ${location.state}?`,
      answer: `${service.name} costs in ${
        location.displayName
      } vary based on property size, service frequency, and specific requirements. Our free quote service connects you with 2-4 local professionals specializing in ${service.name.toLowerCase()} in ${
        location.city
      }. Most homeowners receive quotes within 24 hours.`,
    },
    {
      question: `What makes ${service.name.toLowerCase()} in ${
        location.city
      } different from other areas?`,
      answer: `${service.name} in ${location.displayName} requires understanding of ${location.state}'s climate, soil conditions, and seasonal patterns. Professionals serving ${location.city} are familiar with regional challenges specific to the ${location.metroArea} area, ensuring appropriate care for your property.`,
    },
    {
      question: `How quickly can I get ${service.name.toLowerCase()} quotes in ${
        location.city
      }?`,
      answer: `Most homeowners in ${
        location.displayName
      } receive their first ${service.name.toLowerCase()} quote within 24 hours of submitting a request. Some professionals may contact you the same day. Our network of pre-screened local professionals in ${
        location.state
      } is committed to quick response times.`,
    },
    {
      question: `Are ${service.name.toLowerCase()} professionals in ${
        location.city
      } licensed and insured?`,
      answer: `Yes, all professionals in our network specializing in ${service.name.toLowerCase()} and serving ${
        location.displayName
      } are pre-screened for licensing and insurance. We verify credentials before connecting homeowners with professionals to ensure quality and protection for your property.`,
    },
    {
      question: `Can I get quotes for both one-time and ongoing ${service.name.toLowerCase()} in ${
        location.city
      }?`,
      answer: `Absolutely. Whether you need a one-time ${service.name.toLowerCase()} project or regular ongoing service in ${
        location.displayName
      }, our network of professionals can provide quotes for both. Simply specify your needs when submitting your request.`,
    },
    {
      question: `What seasonal considerations affect ${service.name.toLowerCase()} in ${
        location.state
      }?`,
      answer: `${service.name} in ${
        location.displayName
      } follows seasonal patterns specific to ${
        location.state
      }'s climate. Professionals serving ${location.city} understand how ${
        location.state === "Arizona"
          ? "desert conditions and extreme heat"
          : location.state === "Florida"
          ? "high humidity and frequent rain"
          : location.state === "Texas"
          ? "variable weather and heat"
          : "local seasonal changes"
      } affect ${service.name.toLowerCase()} needs throughout the year.`,
    },
    {
      question: `Do ${service.name.toLowerCase()} professionals in ${
        location.city
      } offer emergency services?`,
      answer: `Many professionals serving ${
        location.displayName
      } offer emergency or urgent ${service.name.toLowerCase()} services. When you submit your request, mention if you need urgent service, and professionals will indicate their availability for immediate needs.`,
    },
    {
      question: `Is there an obligation to accept ${service.name.toLowerCase()} quotes in ${
        location.city
      }?`,
      answer: `No, there is absolutely no obligation. You can review all quotes from professionals in ${location.displayName}, ask questions, compare options, and choose the best fit for your needs and budget. If none of the options work for you, you're under no obligation to proceed.`,
    },
  ];
}
