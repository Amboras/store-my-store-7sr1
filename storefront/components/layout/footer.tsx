'use client'

import Link from 'next/link'
import { PawPrint, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'

const shopLinks = [
  { label: 'The feeding mat', href: '/products/pawprint-pet-feeding-mat-with-stainless-steel-bowls' },
  { label: 'Shop all', href: '/products' },
  { label: 'Our story', href: '/about' },
]

const helpLinks = [
  { label: 'Care notes', href: '/faq' },
  { label: 'Shipping & returns', href: '/shipping' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const { policies } = usePolicies()
  const policyLinks = [
    policies?.privacy_policy ? { label: 'Privacy', href: '/privacy' } : null,
    policies?.terms_of_service ? { label: 'Terms', href: '/terms' } : null,
    policies?.refund_policy ? { label: 'Refunds', href: '/refund-policy' } : null,
    policies?.cookie_policy ? { label: 'Cookies', href: '/cookie-policy' } : null,
  ].filter(Boolean) as { label: string; href: string }[]

  const promises = [
    { icon: PawPrint, title: 'Made for daily life', copy: 'Easy-care pet essentials.' },
    { icon: Truck, title: 'Thoughtful delivery', copy: 'Order updates from checkout.' },
    { icon: RotateCcw, title: 'Need a hand?', copy: 'Support is close by.' },
    { icon: ShieldCheck, title: 'Checkout confidence', copy: 'Your details stay protected.' },
  ]

  return (
    <footer className="border-t border-border bg-muted/75">
      <div className="border-b border-border">
        <div className="container-custom grid divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {promises.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex gap-3 px-0 py-6 md:px-5 lg:px-6">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.7} aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-foreground">{title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-custom py-14 lg:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="font-heading text-3xl font-semibold tracking-[-0.055em]">My Store<span className="text-accent">.</span></Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Pet essentials that make the everyday rituals softer, simpler, and a little more beautiful.</p>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">A little more room for wag.</p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.17em]">Shop</h2>
            <ul className="mt-5 space-y-3">
              {shopLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-accent">{link.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.17em]">Help</h2>
            <ul className="mt-5 space-y-3">
              {helpLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-accent">{link.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.17em]">Follow the routine</h2>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">Quiet home ideas and fresh essentials, whenever there&apos;s something worth sharing.</p>
            <Link href="/contact" className="mt-5 inline-block border-b border-foreground pb-1 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent">Say hello</Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} My Store. Better mealtimes for pets.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {policyLinks.map((link) => <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">{link.label}</Link>)}
            <button
              data-manage-cookies
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="transition-colors hover:text-foreground"
            >
              Manage cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
