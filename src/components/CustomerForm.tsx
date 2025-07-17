import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface CustomerDetailsFormProps {
  onClose: () => void;
  onSubmit: (data: CustomerFormData) => void;
  isSubmitting?: boolean;
}

export interface CustomerFormData {
  fullName: string;
  address: string;
  mobileNumber: string;
  emailId: string;
  gender: "male" | "female";
}

export function CustomerDetailsForm({
  onClose,
  onSubmit,
  isSubmitting = false,
}: CustomerDetailsFormProps) {
  const [formData, setFormData] = useState<CustomerFormData>({
    fullName: "",
    address: "",
    mobileNumber: "",
    emailId: "",
    gender: "male",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof CustomerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-pibox-form-bg border border-pibox-form-border rounded-[27px] p-6 w-full max-w-[541px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-pibox-text-heading font-reddit-sans text-[28px] font-semibold">
            Details
          </h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/10 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-4 h-4 text-pibox-text-heading" />
          </button>
        </div>

        {/* Background decorative elements - positioned absolutely */}
        <div className="absolute -left-16 top-32 w-24 h-24 opacity-20">
          {/* Study notes icon SVG */}
          <svg
            className="w-full h-full rotate-[-30deg]"
            viewBox="0 0 79 140"
            fill="none"
          >
            <path
              d="M82.4375 23.4761L71.4383 29.8265L69.3215 26.1601C68.0514 23.9603 65.7381 23.3404 63.5383 24.6105..."
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="48.8726"
                y1="33.0777"
                x2="91.2087"
                y2="106.406"
              >
                <stop stopColor="#F19A6D" />
                <stop offset="1" stopColor="#8B593F" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute left-8 bottom-8 w-19 h-19 opacity-20">
          {/* School bag icon SVG */}
          <svg
            className="w-full h-full rotate-[30deg]"
            viewBox="0 0 30 105"
            fill="none"
          >
            <path
              d="M-53.6528 42.1871L-58.4156 50.4365C-60.797 54.5612..."
              fill="url(#paint0_linear_2)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2"
                x1="-7.10352"
                y1="25.0655"
                x2="-38.8555"
                y2="80.0615"
              >
                <stop stopColor="#3B93FE" />
                <stop offset="1" stopColor="#235898" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Form Fields */}
          <div className="space-y-5">
            <div className="relative">
              <Input
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="h-[60px] bg-pibox-input-bg border-pibox-form-border border-[0.9px] rounded-xl px-5 text-white placeholder:text-pibox-text-muted font-reddit-sans text-xl focus:border-white/50"
                required
              />
            </div>

            <div className="relative">
              <Input
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="h-[60px] bg-pibox-input-bg border-pibox-form-border border-[0.9px] rounded-xl px-5 text-white placeholder:text-pibox-text-muted font-reddit-sans text-xl focus:border-white/50"
                required
              />
            </div>

            <div className="relative">
              <Input
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={(e) =>
                  handleInputChange("mobileNumber", e.target.value)
                }
                className="h-[60px] bg-pibox-input-bg border-pibox-form-border border-[0.9px] rounded-xl px-5 text-white placeholder:text-pibox-text-muted font-reddit-sans text-xl focus:border-white/50"
                type="tel"
                required
              />
            </div>

            <div className="relative">
              <Input
                placeholder="Email ID"
                value={formData.emailId}
                onChange={(e) => handleInputChange("emailId", e.target.value)}
                className="h-[60px] bg-pibox-input-bg border-pibox-form-border border-[0.9px] rounded-xl px-5 text-white placeholder:text-pibox-text-muted font-reddit-sans text-xl focus:border-white/50"
                type="email"
                required
              />
            </div>
          </div>

          {/* Gender Selection */}
          <div className="pt-5">
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
              className="flex gap-4"
            >
              <div className="flex items-center gap-4 h-[60px] px-5 rounded-xl border border-pibox-form-border bg-pibox-input-bg flex-1">
                <RadioGroupItem
                  value="male"
                  id="male"
                  className="border-2 border-white w-5 h-5 text-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <Label
                  htmlFor="male"
                  className="text-pibox-text-muted font-reddit-sans text-2xl font-normal cursor-pointer"
                >
                  Male
                </Label>
              </div>

              <div className="flex items-center gap-4 h-[60px] px-5 rounded-xl border border-pibox-form-border bg-pibox-input-bg flex-1">
                <RadioGroupItem
                  value="female"
                  id="female"
                  className="border-2 border-white w-5 h-5 text-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <Label
                  htmlFor="female"
                  className="text-pibox-text-muted font-reddit-sans text-2xl font-normal cursor-pointer"
                >
                  Female
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Confirm Button */}
          <div className="pt-5">
            <Button
              type="submit"
              className="w-[235px] h-[60px] mx-auto bg-pibox-text-heading hover:bg-pibox-text-heading/90 text-[#2F2F2F] font-reddit-sans text-[26px] font-semibold rounded-2xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
