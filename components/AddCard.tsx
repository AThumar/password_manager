// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// const formSchema = z.object({
//   cardNumber: z
//     .string()
//     .min(16, { message: "Card number must be exactly 16 digits" })
//     .max(16, { message: "Card number must be exactly 16 digits" })
//     .refine((val) => /^\d+$/.test(val), {
//       message: "Card number can only contain numbers",
//     }),

//   expiryDate: z
//     .string()
//     .min(4, { message: "Expiry date must be in MMYY format" })
//     .max(4, { message: "Expiry date must be in MMYY format" })
//     .refine((val) => /^\d+$/.test(val), {
//       message: "Expiry date can only contain numbers",
//     })
//     .refine(
//       (val) => {
//         const month = parseInt(val.substring(0, 2));
//         return month >= 1 && month <= 12;
//       },
//       {
//         message: "Month must be between 01 and 12",
//       }
//     ),

//   cvv: z
//     .string()
//     .min(3, { message: "CVV must be exactly 3 digits" })
//     .max(3, { message: "CVV must be exactly 3 digits" })
//     .refine((val) => /^\d+$/.test(val), {
//       message: "CVV can only contain numbers",
//     }),
// });

// export default function AddCard() {
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");

//   useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="CardNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Card Number</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="1234 5678 9012 3456"
//                   {...field}
//                   maxLength={16}
//                 />
//               </FormControl>
//               <FormDescription>
//                 Enter your 16-digit card number
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="flex gap-4">
//           <FormField
//             control={form.control}
//             name="ExpiryDate"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Expiry Date</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="MM/YY"
//                     {...field}
//                     maxLength={5}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Card expiry date (MM/YY)
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="CVV"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>CVV</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="123"
//                     {...field}
//                     maxLength={4}
//                     type="password"
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Security code on back of card
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }

"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCardServer } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
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
  const user = useUser();
  const userId = user.id;
  // Initialize form with proper type inference
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (user.user) {
      addCardServer(
        values.cardNumber,
        values.expiryDate,
        values.cvv,
        user?.user?.id
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="1234 5678 9012 3456"
                  {...field}
                  maxLength={16}
                />
              </FormControl>
              <FormDescription>Enter your 16-digit card number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input placeholder="MMYY" {...field} maxLength={4} />
                </FormControl>
                <FormDescription>Card expiry date (MMYY)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123"
                    {...field}
                    maxLength={3}
                    type="password"
                  />
                </FormControl>
                <FormDescription>Security code on back of card</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
