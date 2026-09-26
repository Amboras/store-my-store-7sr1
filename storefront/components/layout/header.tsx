'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import CartDrawer from '@/components/cart/cart-drawer'
import { useAuth } from '@/hooks/use-auth'
import { useCart } from '@/hooks/use-cart'

export default function Header() {
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isMobileMenuOpen) mobileMenuCloseRef.current?.focus()
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const handleMobileMenuKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }, [])

  const navLinks = [
    { label: 'Shop', href: '/products' },
    { label: 'Our story', href: '/about' },
    { label: 'Care notes', href: '/faq' },
  ]

  return (
    <>
      <header data-nav-behavior="always-solid" className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container-custom flex h-16 items-center justify-between gap-4 lg:h-[4.75rem]">
          <button onClick={() => setIsMobileMenuOpen(true)} className="-ml-2 grid min-h-11 min-w-11 place-items-center lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <Link href="/" className="font-heading text-xl font-semibold tracking-[-0.05em] sm:text-2xl">
            My Store<span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <Link href="/search" className="grid min-h-11 min-w-11 place-items-center transition-colors hover:text-accent" aria-label="Search">
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </Link>
            <Link href={isLoggedIn ? '/account' : '/auth/login'} className="hidden min-h-11 min-w-11 place-items-center transition-colors hover:text-accent sm:grid" aria-label={isLoggedIn ? 'Account' : 'Sign in'}>
              <User className="h-[18px] w-[18px]" aria-hidden="true" />
            </Link>
            <button onClick={() => setIsCartOpen(true)} className="relative grid min-h-11 min-w-11 place-items-center transition-colors hover:text-accent" aria-label="Open shopping bag">
              <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
              {itemCount > 0 ? <span className="absolute right-0 top-1 min-w-4 bg-accent px-1 text-center text-[10px] font-bold leading-4 text-accent-foreground">{itemCount}</span> : null}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 cursor-default bg-foreground/35" aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)} />
          <div ref={mobileMenuRef} role="dialog" aria-modal="true" aria-label="Navigation menu" onKeyDown={handleMobileMenuKeyDown} className="absolute inset-y-0 left-0 flex w-[20rem] max-w-[86vw] flex-col border-r border-border bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <span className="font-heading text-2xl font-semibold tracking-[-0.05em]">My Store<span className="text-accent">.</span></span>
              <button ref={mobileMenuCloseRef} onClick={() => setIsMobileMenuOpen(false)} className="grid min-h-11 min-w-11 place-items-center" aria-label="Close menu">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="border-b border-border py-5 font-heading text-3xl font-semibold tracking-[-0.04em] transition-colors hover:text-accent">
                  {link.label}
                </Link>
              ))}
              <Link href={isLoggedIn ? '/account' : '/auth/login'} onClick={() => setIsMobileMenuOpen(false)} className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {isLoggedIn ? 'Account' : 'Sign in'}
              </Link>
            </nav>
          </div>
        </div>
      ) : null}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
