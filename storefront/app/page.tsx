'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, PawPrint } from 'lucide-react'
import ProductCard from '@/components/product/product-card'
import { useProducts } from '@/hooks/use-products'
import { trackMetaEvent } from '@/lib/meta-pixel'

const productHref = '/products/pawprint-pet-feeding-mat-with-stainless-steel-bowls'
const productImage = 'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/74057b70-225b-43f5-8f97-37f745ca4e6c%2F01M3FA3QWB4WCPP5WTMDJSMWTT.jpeg'
const dogLookbook = 'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/74057b70-225b-43f5-8f97-37f745ca4e6c%2F01M3FA93MNPCRPSNXPRJA9HRXZ.webp'
const catLookbook = 'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/74057b70-225b-43f5-8f97-37f745ca4e6c%2F01M3FA9200EAJCFZ5SJT33FF9J.webp'
const editorialImage = 'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/74057b70-225b-43f5-8f97-37f745ca4e6c%2F01M3FA91W8G4KEXTMNJNVMRJCS.webp'

function LookbookTile({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <Link href={productHref} className={`group relative block overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/55 to-transparent px-4 pb-4 pt-12 text-xs font-medium uppercase tracking-[0.16em] text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Shop the feeding set
      </span>
    </Link>
  )
}

export default function HomePage() {
  const { data: products, isLoading } = useProducts({ limit: 4 })
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [hasSubscribed, setHasSubscribed] = useState(false)

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newsletterEmail.trim()) return

    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
    setHasSubscribed(true)
  }

  return (
    <>
      <section className="overflow-hidden border-b border-border bg-background">
        <div className="container-custom grid gap-12 py-16 lg:min-h-[700px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-12">
          <div className="relative z-10 max-w-xl py-8 lg:py-14">
            <p className="mb-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <PawPrint className="h-4 w-4" aria-hidden="true" />
              Easier mealtimes, outside and in
            </p>
            <div className="relative">
              <span className="absolute left-0 right-[-6rem] top-[52%] -z-10 h-px bg-accent/55" aria-hidden="true" />
              <h1 className="max-w-lg font-heading text-[clamp(3.25rem,7vw,6.7rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-foreground">
                Less mess.<br />
                More wag.
              </h1>
            </div>
            <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              A colourful, easy-clean feeding station that helps keep the good parts of mealtime exactly where they belong.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={productHref}
                className="inline-flex min-h-12 items-center gap-3 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-300 hover:bg-accent"
              >
                Meet the mat <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/about" className="min-h-12 border-b border-foreground px-1 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent">
                Our point of view
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 border-t border-border pt-5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <div className="pr-3"><dt className="text-foreground">Non-slip</dt><dd className="mt-2 leading-5">Stays put for dinner.</dd></div>
              <div className="border-l border-border px-3"><dt className="text-foreground">Easy-clean</dt><dd className="mt-2 leading-5">Wipe, rinse, repeat.</dd></div>
              <div className="border-l border-border pl-3"><dt className="text-foreground">Raised edge</dt><dd className="mt-2 leading-5">Helps corral spills.</dd></div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-xl self-end">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-muted">
              <Image
                src={productImage}
                alt="Turquoise pet feeding mat with stainless steel bowls"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -left-3 bg-accent px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground sm:-left-8">
              For pups + small dogs
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/65 py-20 lg:py-28">
        <div className="container-custom">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">01 / The everyday scene</p>
              <h2 className="mt-3 max-w-lg font-heading text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Built for the living parts of home.</h2>
            </div>
            <Link href={productHref} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] hover:text-accent">
              See it up close <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid h-[620px] grid-cols-2 grid-rows-2 gap-3 sm:h-[720px] lg:grid-cols-4 lg:grid-rows-1">
            <LookbookTile src={dogLookbook} alt="Dog beside a feeding mat in a warm home" className="col-span-2 row-span-1 lg:col-span-2" />
            <LookbookTile src={productImage} alt="Turquoise pet feeding mat with two bowls" className="row-span-1" />
            <LookbookTile src={catLookbook} alt="Cat near a feeding mat in a sunlit home" className="row-span-1" />
            <LookbookTile src={editorialImage} alt="Feeding mat detail on terracotta flooring" className="col-span-2 row-span-1 lg:hidden" />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background py-20 lg:py-28">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">02 / The good stuff</p>
              <h2 className="mt-3 max-w-sm font-heading text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">A calmer floor starts here.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">One considered essential for daily feeding—designed to be practical enough for the morning rush and good-looking enough to leave out.</p>
          </div>

          <div className="mt-12 grid max-w-5xl gap-8 md:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] md:items-end">
            {isLoading ? (
              <div className="aspect-[3/4] animate-pulse bg-muted" />
            ) : products?.[0] ? (
              <ProductCard product={products[0]} />
            ) : null}
            <div className="border-l-2 border-accent px-6 py-5 sm:px-8">
              <p className="font-heading text-3xl font-semibold leading-tight tracking-[-0.035em]">A place for bowls, not for the aftermath.</p>
              <p className="mt-4 max-w-md leading-7 text-muted-foreground">The raised silicone edge helps catch the scattered bits. Stainless steel bowls make the daily routine feel a little more considered.</p>
              <Link href={productHref} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] hover:text-accent">
                Shop the feeding mat <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 lg:py-28">
        <div className="container-custom grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">03 / A softer routine</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">The small things set the tone.</h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            {[
              ['For real life', 'Water splashes, enthusiastic eaters, and quick cleanups are all part of the plan.'],
              ['Easy by design', 'A simple surface keeps one more daily task from becoming a whole production.'],
              ['Colour with purpose', 'A bright turquoise moment for the room your pet already runs.'],
            ].map(([title, copy], index) => (
              <article key={title} className="bg-background p-6 sm:p-7">
                <p className="text-xs font-semibold tracking-[0.18em] text-accent">0{index + 1}</p>
                <h3 className="mt-7 font-heading text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-muted">
            <Image src={editorialImage} alt="Pet feeding essentials on terracotta tile" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          </div>
          <div className="max-w-xl lg:pl-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">04 / Our way</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Home goods for the whole household.</h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">We think pet essentials should be as thoughtful as everything else you bring into your space: useful, uncomplicated, and a little bit joyful.</p>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-2 text-sm font-semibold uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent">
              Meet My Store <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground lg:py-24">
        <div className="container-custom grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/65">Notes from the bowl</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Good homes are always a work in progress.</h2>
            <p className="mt-5 max-w-xl leading-7 text-primary-foreground/70">New pet essentials, practical care ideas, and quiet things that make everyday life easier.</p>
          </div>
          <form className="w-full max-w-md" onSubmit={handleNewsletterSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <div className="flex border-b border-primary-foreground/50">
              <input
                id="newsletter-email"
                type="email"
                required
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="Your email address"
                className="min-h-12 w-full bg-transparent px-0 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none"
              />
              <button type="submit" className="min-h-12 shrink-0 px-2 text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:text-accent" aria-label="Subscribe to updates">
                Join
              </button>
            </div>
            <p className="mt-3 text-xs leading-5 text-primary-foreground/60">{hasSubscribed ? 'Thank you—your note is on its way.' : 'Practical pet-home notes. No daily noise.'}</p>
          </form>
        </div>
      </section>
    </>
  )
}
