import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">Hu'jjet tapsiriw ushin formani toltirin'</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Ati</Label>
            <Input id="firstName" placeholder="Atin'izdi kiritin'" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Familyasi</Label>
            <Input id="lastName" placeholder="Familyan'izdi kiritin'" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="middleName">Akesinin' ati</Label>
          <Input id="middleName" placeholder="Otchestva" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Tuwilg'an sa'nesi</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start font-normal">
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                <span id="dateOfBirth">Tuwilg'an sanen'izdi kiritin'</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Telefon nomer</Label>
          <Input id="phoneNumber" placeholder="Enter your phone number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Jo'nelisti tan'lan'</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Jo'nelisti tan'lan'" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Jo'nelis 1</SelectItem>
              <SelectItem value="1">Jo'nelis 2</SelectItem>
              <SelectItem value="2">Jo'nelis 3</SelectItem>
              <SelectItem value="3">Jo'nelis 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">Jiberiw</Button>
      </CardFooter>
    </Card>
  )
}

function CalendarDaysIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
  )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}