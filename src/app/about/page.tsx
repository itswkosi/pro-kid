import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Flag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";

const team = [
  {
    name: "Dr Allison Dart",
    role: "Principal Investigator",
    org: "Professor of Pediatrics\nUniversity of Manitoba",
    image: "/images/Allison-Headshot.png",
    profileUrl: "https://www.chrim.ca/investigator/allison-dart/",
  },
  {
    name: "Dr Mina Matsuda-Abedini",
    role: "Co-Investigator",
    org: "Professor of Pediatrics\nUniversity of Manitoba",
    image: "/images/Mina-Headshot.jpeg",
    profileUrl: "https://www.bcchr.ca/research/find-a-researcher/mina-matsuda-abedini/",
  },
  {
    name: "Karma Abukasm",
    role: "Co-Investigator",
    org: "Assistant Professor of Pediatrics\nUniversity of Manitoba",
    image: "/images/Karma-Headshot.JPG",
  },
  {
    name: "Dr Banke Oketola",
    role: "Research Manager",
    org: "Associate Professor of Pediatrics\nUniversity of Manitoba",
    image: "/images/Banke-Headshot.png",
  },
];

const collaborators = [
  {
    name: "University of Manitoba",
    logo: "/images/um-logo.png",
  },
  {
    name: "University of British Columbia (UBC)",
    logo: "/images/ubc-logo.png",
  },
  {
    name: "SickKids",
    logo: "/images/sickkids.svg.png",
  },
  {
    name: "Can-SOLVE CKD Network",
    logo: "/images/can-solve-logo.png",
  },
  {
    name: "Children's Hospital Research Institute of Manitoba",
    logo: "/images/chrim logo.png",
  },
  {
    name: "CIHR-IRSC",
    logo: "/images/CIHR IRSC-logo.png",
  },
  {
    name: "Kidney Foundation of Canada",
    logo: "/images/Kidney-Foundation-logo.png.tiff",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] text-[#173B68]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-[#1E4E8C]"
      >
        Skip to main content
      </a>
      <Navbar />

      <main id="main-content" className="overflow-hidden">
        <section className="relative overflow-hidden bg-[#F4F2FB] pb-12 pt-8 sm:pt-10 lg:min-h-[500px]">
          <Image
            src="/images/hero-about.png"
            alt=""
            width={1672}
            height={941}
            priority
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-full w-auto max-w-none select-none"
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-[#5E7597]">Home <span className="mx-1 text-[#A4B4CC]">›</span> About PRO-KID</p>

            <div className="mt-8 max-w-xl pb-6 lg:pt-6">
              <h1 className="text-5xl font-bold tracking-[-0.03em] text-[#163C72] sm:text-6xl">About PRO-KID</h1>
              <p className="mt-6 text-xl font-semibold leading-9 text-[#244C7C]">
                PRO-KID is a validated questionnaire that helps children and youth with CKD
                communicate their symptoms and how they feel while living with CKD.
              </p>
              <p className="mt-5 max-w-lg text-lg leading-8 text-[#3B5E88]">
                It helps healthcare teams understand what matters most so they can provide
                the best possible care.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16" aria-labelledby="mission-vision-title">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="mission-vision-title" className="sr-only">
              Mission and Vision
            </h2>
            <div className="grid overflow-hidden rounded-[30px] border border-[#E2EAF7] bg-[linear-gradient(145deg,#FDFEFF_0%,#F5F9FF_100%)] shadow-[0_18px_54px_-34px_rgba(30,71,125,0.4)] md:grid-cols-2">
              <article className="border-b border-[#E2EAF7] p-8 sm:p-10 md:border-b-0 md:border-r">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EDE9FB] text-[#6145A7]">
                    <Flag className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="text-3xl font-bold tracking-[-0.02em] text-[#6A47B1]">Our Mission</h3>
                    <p className="mt-4 max-w-xl text-lg leading-8 text-[#36547B]">
                      To improve the lives of children and youth with chronic kidney disease
                      through better communication, strong patient partnerships, and
                      meaningful research.
                    </p>
                  </div>
                </div>
              </article>

              <article className="p-8 sm:p-10">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DDF5E9] text-[#2E8C6D]">
                    <Eye className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="text-3xl font-bold tracking-[-0.02em] text-[#42966C]">Our Vision</h3>
                    <p className="mt-4 max-w-xl text-lg leading-8 text-[#36547B]">
                      A future where every child with kidney disease has the opportunity to
                      be heard, understood, and supported to live their best life.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-white pb-12 sm:pb-16">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:px-8">
            <article>
              <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#163C72] sm:text-5xl">
                Developed With and For Patients
              </h2>
              <span className="mt-4 block h-1.5 w-20 rounded-full bg-[#EDC43F]" aria-hidden="true" />
              <p className="mt-6 text-lg leading-8 text-[#35557E]">
                PRO-KID was developed through a patient-partnered approach. Children,
                youth, parents, caregivers, and healthcare professionals worked together at
                every step to make sure the questionnaire reflects the real experiences of
                young people living with kidney disease.
              </p>
              <p className="mt-5 text-lg leading-8 text-[#35557E]">
                This collaboration ensures that PRO-KID is meaningful, relevant, and easy
                to use in everyday clinical care.
              </p>
            </article>

            <div className="relative overflow-hidden rounded-[30px] bg-white p-2 shadow-[0_20px_70px_-34px_rgba(21,68,124,0.35)]">
              <Image
                src="/images/develop.png"
                alt="Children and healthcare professional discussing care together"
                width={1280}
                height={720}
                className="h-full w-full rounded-[24px] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white pb-10 sm:pb-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 rounded-[28px] border border-[#E5ECFA] bg-[linear-gradient(145deg,#F7F4FF_0%,#F4F9FF_100%)] p-8 shadow-[0_18px_54px_-36px_rgba(24,73,130,0.4)] md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:items-center">
              <article className="flex items-start gap-4 md:pr-6">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DDD2FA] text-[#6A47B1]">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-3xl font-bold text-[#6A47B1]">Research-Backed</h3>
                  <p className="mt-2 text-base leading-7 text-[#3A5B85]">
                    PRO-KID is based on rigorous research and has been clinically validated
                    for children and youth ages 2-18 years with chronic kidney disease.
                  </p>
                </div>
              </article>

              <div className="grid gap-4 border-t border-[#DCE5F6] pt-5 sm:grid-cols-3 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <article className="text-center sm:text-left md:text-center">
                  <p className="text-2xl font-bold text-[#183F74]">14</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-[#44658F]">questions that matter</p>
                </article>
                <article className="text-center sm:text-left md:text-center">
                  <p className="text-2xl font-bold text-[#183F74]">100%</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-[#44658F]">developed with patient partners</p>
                </article>
                <article className="text-center sm:text-left md:text-center">
                  <p className="text-2xl font-bold text-[#183F74]">Validated</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-[#44658F]">in pediatric clinical research</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F5F9FF] pt-12 pb-10 sm:pt-16 sm:pb-14" aria-labelledby="team-title">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="team-title" className="text-center text-4xl font-bold tracking-[-0.02em] text-[#163C72] sm:text-5xl">
              The PRO-KID Research Team
            </h2>
            <span className="mx-auto mt-4 block h-1.5 w-20 rounded-full bg-[#EDC43F]" aria-hidden="true" />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <article
                  key={member.name}
                  className="rounded-[22px] border border-[#DFE8F7] bg-white p-5 shadow-[0_20px_65px_-42px_rgba(25,70,121,0.48)]"
                >
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border border-[#DCE6F8] bg-white">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="h-full w-full scale-[1.15] bg-white object-cover"
                      style={{ objectPosition: "center 20%" }}
                    />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.01em] text-[#6354B2]">{member.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#1A3D72]">{member.role}</p>
                  {member.profileUrl ? (
                    <Link
                      href={member.profileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center text-sm font-medium text-[#3C4EA0] underline-offset-4 transition hover:underline"
                    >
                      Learn more about them
                    </Link>
                  ) : (
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#58779C]">{member.org}</p>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/publications"
                className="inline-flex items-center gap-2 rounded-full border border-[#C9D9F0] bg-white px-7 py-3 text-base font-semibold text-[#3C4EA0] transition hover:bg-[#F7FAFF]"
              >
                Learn More About Our Research
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E2EAF7] bg-white py-12 sm:py-16" aria-labelledby="collaborators-title">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="collaborators-title" className="text-center text-4xl font-bold text-[#163C72] sm:text-5xl">
              Our Collaborators
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-center">
              {collaborators.map((collaborator) => (
                <div
                  key={collaborator.name}
                  className="flex min-h-[170px] w-full max-w-[300px] flex-col items-center justify-center rounded-2xl border border-[#E4ECF8] bg-[#F9FBFF] px-6 py-6 text-sm font-semibold leading-6 text-[#335981]"
                >
                  <Image
                    src={collaborator.logo}
                    alt={`${collaborator.name} logo`}
                    width={220}
                    height={90}
                    className="h-16 w-auto max-w-[220px] object-contain"
                  />
                  <p className="mt-4 text-sm font-semibold leading-6 text-[#335981]">
                    {collaborator.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
