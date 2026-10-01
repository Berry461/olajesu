import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
//import { Separator } from "@/components/ui/separator";

// Wedding date — Saturday, 28 November 2026, 10:00 AM WAT
const WEDDING_DATE = new Date("2026-11-28T10:00:00+01:00");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => target.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(target.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const clamped = Math.max(timeLeft, 0);
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  const seconds = Math.floor((clamped / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <span className="h-px w-10 bg-[#C6A253]" />
      <span className="h-1.5 w-1.5 rotate-45 bg-[#C6A253]" />
      <span className="h-px w-10 bg-[#C6A253]" />
    </div>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      <p className="font-serif text-sm italic text-[#8A6A3A]">{label}</p>
      <h2 className="mt-1 font-serif text-3xl text-[#2B2420] sm:text-4xl">
        {title}
      </h2>
      <Divider />
    </div>
  );
}

export default function Home() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const [attending, setAttending] = useState("yes");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [revealedNG, setRevealedNG] = useState(false);
  const [revealedUK, setRevealedUK] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", "b2a20d2b-45b5-46d8-82a4-ff2c1d227be1");
    data.append("subject", "New RSVP — OlaJesu '26");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7EFE3] font-sans text-[#2B2420]">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-[#E4D5BC] bg-[#F7EFE3]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-center sm:justify-between px-6 py-4">
          <img src="/olajesu-logo.svg" alt="Olajesu '26" className="h-14" />
          <nav className="hidden gap-6 text-sm sm:flex">
            <a href="#rsvp" className="hover:text-[#6B1E2B]">RSVP</a>
            <a href="#schedule" className="hover:text-[#6B1E2B]">Schedule</a>
            <a href="#stay" className="hover:text-[#6B1E2B]">Stay</a>
            <a href="#registry" className="hover:text-[#6B1E2B]">Gift</a>
            <a href="#faq" className="hover:text-[#6B1E2B]">Q&A</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 text-center sm:py-28">
        <p className="font-serif italic text-[#8A6A3A]">It's happening</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight text-[#6B1E2B] sm:text-7xl">
          OlaJesu <span className="text-[#C6A253]">'26</span>
        </h1>
        <Divider />
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#5A4E40]">
          Saturday, 28 November 2026 · Hadassah Hall, Ojota, Lagos
        </p>
        <p className="mx-auto mt-6 max-w-xl text-[#5A4E40]">
          After over 3 years, 5 cities, and more late-night conversations than
          we can count, we're finally doing this — and we would love you
          there for all of it.
        </p>
        <div className="mt-10">
          <img
            src="images/couple-traditional.jpg"
            alt="The couple in traditional attire"
            className="mx-auto max-h-[560px] w-auto max-w-full rounded-md"
          />
        </div>
      </section>

      {/* Countdown */}
      <section className="bg-[#6B1E2B] px-6 py-12 text-center text-[#F7EFE3]">
        <p className="font-serif italic text-[#E7C88A]">Counting down to</p>
        <h3 className="mt-1 font-serif text-2xl">28 November 2026</h3>
        <div className="mx-auto mt-8 grid max-w-md grid-cols-4 gap-4">
          {[
            { label: "Days", value: days },
            { label: "Hours", value: hours },
            { label: "Minutes", value: minutes },
            { label: "Seconds", value: seconds },
          ].map((item) => (
            <div key={item.label}>
              <div className="font-serif text-4xl text-[#C6A253]">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-xs tracking-wide text-[#E7C88A]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="px-6 py-20">
        <div className="mx-auto max-w-xl">
          <SectionHeading label="Kindly reply" title="RSVP" />
          <Card className="border-[#E4D5BC]">
            <CardContent className="pt-6">
              {submitted ? (
                <div className="py-8 text-center">
                  <p className="font-serif text-2xl text-[#6B1E2B]">
                    Thank you!
                  </p>
                  <p className="mt-2 text-[#5A4E40]">
                    Your reply has been received. We can't wait to celebrate
                    with you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label>Will you be joining us?</Label>
                    <RadioGroup
                      name="attending"
                      value={attending}
                      onValueChange={setAttending}
                      className="mt-2 flex gap-6"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes" className="font-normal">
                          Joyfully accepts
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no" className="font-normal">
                          Regretfully declines
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of guests</Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      min={1}
                      defaultValue={1}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dietary">Dietary needs / allergies</Label>
                    <Input id="dietary" name="dietary" placeholder="Optional" />
                  </div>
                  <div>
                    <Label htmlFor="note">A note for the couple</Label>
                    <Textarea id="note" name="note" placeholder="Optional" />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600">
                      Something went wrong — please try again.
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#6B1E2B] hover:bg-[#591827]"
                  >
                    {submitting ? "Sending..." : "Send reply"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="bg-[#F0E4D3] px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeading label="The weekend" title="Schedule" />
          <div className="space-y-10">
            <div>
              <p className="font-serif text-lg text-[#8A6A3A]">
                Friday, 27 November
              </p>
              <div className="mt-3 border-l-2 border-[#C6A253] pl-5">
                <p className="text-sm text-[#8A6A3A]">7:00 PM</p>
                <p className="font-serif text-xl">Welcome Drinks</p>
                <p className="text-sm text-[#5A4E40]">Venue to be shared</p>
              </div>
            </div>
            <div>
              <p className="font-serif text-lg text-[#8A6A3A]">
                Saturday, 28 November
              </p>
              <div className="mt-3 space-y-6">
                <div className="border-l-2 border-[#C6A253] pl-5">
                  <p className="text-sm text-[#8A6A3A]">10:00 AM</p>
                  <p className="font-serif text-xl">Traditional Ceremony</p>
                  <p className="text-sm text-[#5A4E40]">
                    Hadassah Hall, 21 Emmanuel Street (beside Mictec Int'l
                    School), off Ogudu Road, Ojota, Lagos
                  </p>
                  <p className="text-sm text-[#5A4E40]">
                    Traditional attire encouraged.
                  </p>
                </div>
                <div className="border-l-2 border-[#C6A253] pl-5">
                  <p className="text-sm text-[#8A6A3A]">2:00 PM</p>
                  <p className="font-serif text-xl">Reception &amp; Dinner</p>
                  <p className="text-sm text-[#5A4E40]">Hadassah Hall</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section id="stay" className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading label="Accommodation" title="Places to Stay" />
          <p className="mb-8 text-center text-[#5A4E40]">
            Any hotel along Ogudu / Ojota Road works well — here are two we'd
            suggest.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {["Sarah Suites", "Crest View"].map((hotel) => (
              <Card key={hotel} className="border-[#E4D5BC]">
                <CardContent className="pt-6">
                  <p className="font-serif text-xl">{hotel}</p>
                  <p className="mt-1 text-sm text-[#5A4E40]">
                    Along Ogudu / Ojota Road, Lagos
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel */}
      <section className="bg-[#F0E4D3] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading label="Getting here" title="Travel" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              { title: "By Air", body: "Fly into Murtala Muhammed International Airport (LOS)." },
              { title: "By Road", body: "The venue sits off Ogudu Road, Ojota — easily reached from most parts of Lagos." },
              { title: "Visas", body: "Please check entry requirements early if travelling internationally." },
              { title: "Getting Around", body: "Indrive and Bolt run reliably across Lagos." },
            ].map((item) => (
              <div key={item.title}>
                <p className="font-serif text-lg">{item.title}</p>
                <p className="mt-1 text-sm text-[#5A4E40]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift note */}
      <section id="registry" className="px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <SectionHeading label="If you'd like to give" title="Gifts" />
          <p className="text-[#5A4E40]">
            Your presence is more than enough. But if you'd like to honour us
            with a gift, a monetary gift towards our home and honeymoon would
            be sincerely appreciated.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Nigeria account */}
            <Card className="border-[#E4D5BC] text-left">
              <CardContent className="pt-6">
                <p className="text-xs uppercase tracking-wide text-[#8A6A3A]">
                  Nigeria
                </p>
                <p className="mt-1 font-serif text-lg">GTBank</p>

                {revealedNG ? (
                  <div className="mt-3 space-y-1 text-sm text-[#2B2420]">
                    <p>Oluwaseyi Jesutofunmi Ogunmoroti</p>
                    <p className="font-mono text-base tracking-wide">
                      0604987267
                    </p>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3 w-full border-[#C6A253] text-[#6B1E2B] hover:bg-[#F0E4D3]"
                    onClick={() => setRevealedNG(true)}
                  >
                    Tap to view account details
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* UK account */}
            <Card className="border-[#E4D5BC] text-left">
              <CardContent className="pt-6">
                <p className="text-xs uppercase tracking-wide text-[#8A6A3A]">
                  United Kingdom
                </p>
                <p className="mt-1 font-serif text-lg">Revolut Ltd</p>

                {revealedUK ? (
                  <div className="mt-3 space-y-1 text-sm text-[#2B2420]">
                    <p>Oluwaseyi Ogunmoroti</p>
                    <p className="font-mono text-base tracking-wide">
                      Acc: 52808033
                    </p>
                    <p className="font-mono text-base tracking-wide">
                      Sort code: 04-29-09
                    </p>
                    <p className="text-xs text-[#5A4E40]">
                      30 South Colonnade, E14 5HX, London, UK
                    </p>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3 w-full border-[#C6A253] text-[#6B1E2B] hover:bg-[#F0E4D3]"
                    onClick={() => setRevealedUK(true)}
                  >
                    Tap to view account details
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#F0E4D3] px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeading label="Good to know" title="Q &amp; A" />
          <Accordion defaultValue={["dress"]} className="w-full">
            <AccordionItem value="dress">
              <AccordionTrigger>What is the dress code?</AccordionTrigger>
              <AccordionContent>White and burgundy (gele /cap)</AccordionContent>
            </AccordionItem>
            <AccordionItem value="parking">
              <AccordionTrigger>Is there parking at the venue?</AccordionTrigger>
              <AccordionContent>Parking is limited — carpooling or ride-hailing is encouraged.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="outdoor">
              <AccordionTrigger>Will the day be outdoors?</AccordionTrigger>
              <AccordionContent>No, the celebration is indoors at Hadassah Hall.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading label="Our story so far" title="Moments" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              "images/couple-casual-1.jpg",
              "images/couple-casual-2.jpg",
              "images/couple-casual-3.jpg",
              "images/couple-traditional.jpg",
              "images/couple-casual-1.jpg",
              "images/couple-casual-2.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-md border border-[#E4D5BC]"
              >
                <img
                  src={src}
                  alt="The couple"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E4D5BC] bg-[#F7EFE3] px-6 py-10 text-center">
        <span className="font-serif text-lg text-[#6B1E2B]">OlaJesu '26</span>
        <p className="mt-1 text-sm text-[#8A6A3A]">
          Saturday, 28 November 2026 · Lagos, Nigeria
        </p>
      </footer>
    </div>
  );
}