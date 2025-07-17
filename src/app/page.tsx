"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Webcam, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CustomerDetailsForm,
  CustomerFormData,
} from "@/components/CustomerForm";

export default function Index() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data: CustomerFormData) => {
    setIsSubmitting(true);
    console.log("Customer data:", data);
    
    try {
      // Send data to our API endpoint
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log('Form submitted successfully:', result);
        alert('Customer details saved successfully!');
        setShowForm(false);
      } else {
        console.error('Form submission failed:', result);
        alert(`Error: ${result.error || 'Failed to save customer details'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    "Core Pi Box device",
    "Essential Cables & Power Adapter",
    "Input Devices (Mouse, Keyboard)",
    "Compatible with all Projectors, Monitors & TV's",
  ];

  const addOns = [
    {
      icon: <Webcam className="w-9 h-9" />,
      name: "Webcam",
    },
    {
      icon: <Monitor className="w-9 h-9" />,
      name: "LED Monitor",
      subtitle: "(19 Inch)",
    },
  ];

  return (
    <div className="min-h-screen bg-pibox-dark text-white font-reddit-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-pibox-nav backdrop-blur-[12.5px] px-8 lg:px-[136px] py-4 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center justify-center w-[52px] h-12 p-1">
            <svg
              className="w-11 h-11"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2_1240)">
                <path
                  d="M22.5015 41.625C33.5761 41.625 42.5538 33.1044 42.5538 22.5938C42.5538 12.0831 33.5761 3.5625 22.5015 3.5625C11.4269 3.5625 2.44922 12.0831 2.44922 22.5938C2.44922 33.1044 11.4269 41.625 22.5015 41.625Z"
                  fill="#E2E2E2"
                />
                <path
                  d="M45.0001 30.0117C43.2421 34.225 40.0294 38.5552 36.0272 41.1029C32.0251 43.6508 27.2906 45.0089 22.4463 44.9988C17.6019 44.9887 12.8741 43.6107 8.88421 41.0461C4.89437 38.4817 1.73785 34.3132 0.00012207 30.0925H0.941545H1.97711C3.56271 33.9436 6.43569 37.0906 10.0762 39.4306C13.7168 41.7706 18.0307 43.028 22.451 43.0372C26.8713 43.0463 31.1911 41.8072 34.8429 39.4825C38.4947 37.1577 41.3075 33.856 42.9115 30.0117H43.9646H45.0001Z"
                  fill="#E2E2E2"
                />
                <path
                  d="M0.470764 13.6874C2.22876 9.47411 4.97082 6.44356 8.97296 3.89576C12.9751 1.34793 17.7095 -0.0101427 22.5539 -4.68691e-06C27.3983 0.0101333 32.1261 1.38801 36.116 3.95255C40.1058 6.51708 42.9799 9.74803 44.7176 13.9687H43.5879H42.4582C40.8727 10.1175 38.5645 7.90813 34.924 5.56809C31.2833 3.22807 26.9696 1.97081 22.5492 1.96157C18.1289 1.95232 13.809 3.19151 10.1572 5.51626C6.50543 7.84102 4.42841 9.84296 2.82432 13.6874H1.60047H0.470764Z"
                  fill="#E2E2E2"
                />
                <path
                  d="M13.1578 15.9258V20.1328C13.1578 20.9297 13.2009 21.5235 13.2872 21.9141C13.3813 22.2969 13.55 22.6133 13.7932 22.8634C14.005 23.082 14.2482 23.2461 14.5228 23.3554C14.8052 23.457 15.174 23.5196 15.629 23.5429V23.8125H8.10938V23.5429C8.5644 23.5196 8.9292 23.457 9.20378 23.3554C9.48621 23.2461 9.73333 23.082 9.94515 22.8634C10.1962 22.6133 10.3649 22.2969 10.4512 21.9141C10.5375 21.5312 10.5806 20.9376 10.5806 20.1328V11.4961C10.5806 10.8242 10.5492 10.3086 10.4865 9.94922C10.4315 9.58204 10.3335 9.28515 10.1923 9.05859C9.9883 8.74609 9.72941 8.51563 9.4156 8.36719C9.10179 8.21094 8.69385 8.11719 8.19175 8.08594H8.10938V7.81641H15.2053C16.4449 7.81641 17.3589 7.8789 17.9472 8.00391C18.5356 8.12891 19.0731 8.37891 19.5594 8.75391C20.6735 9.59766 21.2305 10.7227 21.2305 12.1289C21.2305 13.5586 20.6656 14.6055 19.5359 15.2695C18.9475 15.6133 18.2336 15.8203 17.3942 15.8906C17.1274 15.9141 16.4841 15.9258 15.4642 15.9258H13.1578ZM13.1578 15.5508H14.311C15.0877 15.5508 15.6839 15.4961 16.0997 15.3867C16.5233 15.2695 16.8999 15.0586 17.2294 14.7539C17.9982 14.0586 18.3826 13.1328 18.3826 11.9766C18.3826 11.3359 18.2689 10.75 18.0414 10.2188C17.8217 9.67969 17.504 9.24219 17.0882 8.90625C16.6096 8.50781 16.0409 8.27344 15.3819 8.20313C15.2014 8.18751 14.7896 8.17969 14.1462 8.17969H13.1578V15.5508Z"
                  fill="black"
                />
                <path
                  d="M14.4744 23.379H21.8765V23.6484C21.186 23.6484 20.7153 23.6992 20.4643 23.8008C20.2523 23.8946 20.0798 24.0468 19.9465 24.2578C19.813 24.4687 19.7464 24.707 19.7464 24.9727C19.7464 25.3008 19.872 25.7538 20.123 26.3321L20.4289 27.0585L24.0888 35.9647L26.6423 28.289C26.9718 27.3047 27.1366 26.5702 27.1366 26.0859C27.1366 25.7265 27.0699 25.3788 26.9364 25.0428C26.811 24.6992 26.6423 24.4218 26.4305 24.2109C26.2266 24.0078 25.9912 23.8633 25.7244 23.7772C25.4655 23.6913 25.1321 23.6484 24.7241 23.6484V23.379H32.2908V23.6484C31.828 23.6484 31.4906 23.664 31.2788 23.6953C31.0749 23.7266 30.8827 23.793 30.7021 23.8946C30.4667 24.0352 30.2747 24.2383 30.1256 24.504C29.9844 24.7616 29.9138 25.0428 29.9138 25.3477C29.9138 25.629 30.0235 26.1172 30.2433 26.8125L33.1381 36.1053L36.3744 28.1953C36.8763 26.9844 37.1275 26.0469 37.1275 25.3828C37.1275 24.6875 36.8959 24.1953 36.4331 23.9062C36.1507 23.7343 35.7231 23.6484 35.1505 23.6484V23.379H40.5989V23.6484C40.0732 23.7032 39.6731 23.8046 39.3986 23.9531C39.1318 24.0937 38.8652 24.3555 38.5984 24.7383C38.2062 25.2851 37.7157 26.2734 37.1275 27.7031L32.2908 39.375H31.8085L27.6191 26.8946L23.3709 39.375H22.8412L17.5811 26.7656L17.2281 25.9102C16.9849 25.332 16.7809 24.914 16.6162 24.6562C16.4514 24.3984 16.2514 24.1953 16.016 24.0468C15.8277 23.9218 15.6238 23.832 15.4041 23.7772C15.1844 23.7227 14.8745 23.6797 14.4744 23.6484V23.379Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_2_1240">
                  <rect width="45" height="45" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-18">
            <div className="flex items-center gap-8">
              <div className="flex items-center border-b-3 border-white pb-1">
                <span className="text-white font-bold text-xl">Overview</span>
              </div>
              <span className="text-white/70 font-medium text-xl">
                Key Features
              </span>
              <span className="text-white/70 font-medium text-xl">
                Get Pi Box Now
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative">
        <div className="container mx-auto px-4 lg:px-8 pt-20 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="font-reddit-sans font-bold leading-[105%]">
                  <div className="text-white text-6xl lg:text-[80px] mb-4">
                    The All New
                  </div>
                  <div className="gradient-text text-8xl lg:text-[140px] font-bold">
                    Pi BOX
                  </div>
                </h1>
                <p className="text-white text-2xl lg:text-[24px] leading-[133%] max-w-[693px]">
                  A smart device that transforms a TV/Monitor into an
                  interactive learning platform.
                </p>
              </div>

              <div className="flex gap-5">
                <Button className="h-14 px-7 bg-[#1B2124] hover:bg-[#1B2124]/80 rounded-[28px] text-white font-bold text-lg">
                  Get it Now
                </Button>
                <Button
                  variant="ghost"
                  className="h-14 px-7 text-white hover:bg-white/10 font-bold text-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Content - Product Showcase */}
            <div className="relative">
              {/* Background Elements */}
              <div className="absolute -top-10 -right-10 w-full h-full">
                {/* Colored Circles */}
                <div className="absolute top-20 right-10 w-[200px] h-[200px] rounded-full bg-pibox-cyan opacity-80 blur-sm"></div>
                <div className="absolute top-0 right-32 w-[180px] h-[180px] rounded-full bg-pibox-purple-variant opacity-80 blur-sm"></div>
                <div className="absolute -top-8 -left-16 w-[170px] h-[170px] rounded-full bg-pibox-blue-variant opacity-80 blur-sm"></div>
              </div>

              {/* Main Product Card */}
              <div className="relative bg-gradient-to-b from-pibox-purple-main to-pibox-blue-main rounded-[40px] p-6 lg:p-12 min-h-[600px]">
                {/* Background Pattern */}
                <div className="absolute inset-0 overflow-hidden rounded-[40px]">
                  <div className="absolute inset-0 opacity-20">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-white font-archivo-black text-[124px] transform -rotate-90 whitespace-nowrap"
                        style={{
                          left: `${i * 132}px`,
                          top: "0px",
                          opacity: 0.2 + i * 0.15,
                        }}
                      >
                        Pi Box
                      </div>
                    ))}
                  </div>
                </div>

                {/* Glass overlay */}
                <div className="absolute top-28 right-0 w-[500px] h-[400px] glass-effect rounded-[40px]"></div>

                {/* Product Image */}
                <div className="relative z-10 mb-8">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/1d646ad59eaacda8cfbdec17d9b7b384035390e1?width=1576"
                    alt="Pi Box Device"
                    className="w-full max-w-[500px] h-auto transform rotate-[7.983deg] shadow-2xl mx-auto"
                  />
                </div>

                {/* Product Info */}
                <div className="relative z-10 space-y-12">
                  <h2 className="text-white font-reddit-sans font-bold text-5xl lg:text-[73px] leading-none">
                    Pi Box Basic
                  </h2>

                  <div className="space-y-6">
                    <h3 className="text-white font-reddit-sans text-[30px] font-normal">
                      Whats Inside:
                    </h3>

                    <div className="space-y-6">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-white font-reddit-sans text-2xl">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <h3 className="text-white font-reddit-sans text-2xl">
                      Add Ons
                    </h3>

                    <div className="flex gap-5">
                      {addOns.map((addon, index) => (
                        <div
                          key={index}
                          className="bg-[#F4F8FF] rounded-2xl p-4 flex items-center gap-3 min-w-[252px]"
                        >
                          <div className="text-gray-700">{addon.icon}</div>
                          <div>
                            <div className="text-[#1B2124] font-reddit-sans text-xl font-bold">
                              {addon.name}
                            </div>
                            {addon.subtitle && (
                              <div className="text-[#1B2124] font-reddit-sans text-base">
                                {addon.subtitle}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Buy Now Button with Dropdown */}
                    <DropdownMenu open={showForm} onOpenChange={setShowForm}>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full h-16 bg-[#111] hover:bg-[#111]/80 border border-[#D9DCE1] rounded-2xl text-white font-reddit-sans text-lg shadow-lg">
                          Buy Now
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-0 border-0 bg-transparent shadow-none">
                        <div className="w-0 h-0" />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Customer Details Form Modal */}
      {showForm && (
        <CustomerDetailsForm
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
