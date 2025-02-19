"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be exactly 16 digits" })
    .max(16, { message: "Card number must be exactly 16 digits" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Card number can only contain numbers",
    }),

  expiryDate: z
    .string()
    .min(4, { message: "Expiry date must be in MMYY format" })
    .max(4, { message: "Expiry date must be in MMYY format" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Expiry date can only contain numbers",
    })
    .refine(
      (val) => {
        const month = parseInt(val.substring(0, 2));
        return month >= 1 && month <= 12;
      },
      {
        message: "Month must be between 01 and 12",
      }
    ),

  cvv: z
    .string()
    .min(3, { message: "CVV must be exactly 3 digits" })
    .max(3, { message: "CVV must be exactly 3 digits" })
    .refine((val) => /^\d+$/.test(val), {
      message: "CVV can only contain numbers",
    }),
});

export default function AddCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save the card
    console.log("Card added:", { cardNumber, expiryDate, cvv });
    // Reset form
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Add Card
      </Button>
    </form>
  );
}
