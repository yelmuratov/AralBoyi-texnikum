"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
import { SVGProps, useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from 'date-fns';

// Define the Category type
interface Category {
  id: number;
  name: string;
  code: number;
}

// Define the form schema using Zod
const formSchema = z.object({
  firstName: z.string().nonempty("Talaban ati majburiy"),
  lastName: z.string().nonempty("Familya jaziliwi shart"),
  middleName: z.string().nonempty("Otchestva jaziliwi kerek"),
  dateOfBirth: z.string().nonempty("Tuwilgan sa'ne kiritiliwi sha'rt"),
  phoneNumber: z.string().nonempty("Telefon nomer kiritiliw kerek"),
  secondaryPhoneNumber: z.string().nonempty("Qosimcha nomer kiritiliwi kerek"),
  category: z.number().nonnegative("Jo'nelis tan'laniwi sha'rt"),
  source: z.literal("website")
});

type FormData = z.infer<typeof formSchema>;

export default function Component() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: 'website'
    }
  });

  useEffect(() => {
    axios.get<Category[]>('https://aralboyitexnikum.uz/api/backend/admission/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch categories. Please try again.',
        });
      });
  }, [toast]);

  useEffect(() => {
    if (selectedDate) {
      setValue('dateOfBirth', format(selectedDate, 'yyyy-MM-dd'));
    }
  }, [selectedDate, setValue]);

  const onSubmit = (data: FormData) => {
    axios.post('https://aralboyitexnikum.uz/api/backend/admission/applicants/', {
      first_name: data.firstName,
      last_name: data.lastName,
      middle_name: data.middleName,
      date_of_birth: data.dateOfBirth,
      phone_number: parseInt(data.phoneNumber, 10),
      secondary_phone_number: parseInt(data.secondaryPhoneNumber, 10),
      category: data.category,
      source: data.source,
    })
      .then(response => {
        toast({
          type: 'foreground',
          title: "Siz dizimge alindin'iz",
        });
        reset();
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        const errorMessages = error.response?.data || {};
        const errorDescription = Object.values(errorMessages).flat().join(' ');

        toast({
          variant: 'destructive',
          title: 'Error',
          description: errorDescription || 'An unknown error occurred.',
        });
      });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">Hujjet tapsiriw ushin formani toltirin</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-3 md:p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Ati</Label>
              <Input id="firstName" placeholder="Atin'izdi kiritin'" {...register('firstName')} />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Familyasi</Label>
              <Input id="lastName" placeholder="Familyan'izdi kiritin'" {...register('lastName')} />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="space-y-2 mb-2">
            <Label htmlFor="middleName">Akesinin ati</Label>
            <Input id="middleName" placeholder="Otchestva" {...register('middleName')} />
            {errors.middleName && <p className="text-red-500 text-xs mt-1">{errors.middleName.message}</p>}
          </div>
          <div className="space-y-2 mb-2">
            <Label htmlFor="dateOfBirth">Tuwilgan sanesi</Label>
            <Input type="date" id="dateOfBirth" {...register('dateOfBirth')} />
            {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
          </div>
          <div className="space-y-2 mb-2">
            <Label htmlFor="phoneNumber">Telefon nomer</Label>
            <Input type="tel" id="phoneNumber" placeholder="Telefon nomerin'izdi kiritin'" {...register('phoneNumber')} />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
          </div>
          <div className="space-y-2 mb-2">
            <Label htmlFor="secondaryPhoneNumber">Qosimsha nomer</Label>
            <Input type="tel" id="secondaryPhoneNumber" placeholder="Qosimsha nomer" {...register('secondaryPhoneNumber')} />
            {errors.secondaryPhoneNumber && <p className="text-red-500 text-xs mt-1">{errors.secondaryPhoneNumber.message}</p>}
          </div>
          <div className="space-y-2 mb-2">
            <Label htmlFor="category">Jonelis</Label>
            <Select onValueChange={(value) => setValue('category', parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Jo'nelisti tan'lan'" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>
          <CardFooter className="flex justify-end mt-8">
            <Button type="submit">Jiberiw</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

function CalendarDaysIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
