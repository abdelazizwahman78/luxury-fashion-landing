"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteShell, Breadcrumbs } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/stores/user-store";
import { showToast } from "@/lib/toast";

const initialProfile = {
  fullName: "Amelia Hart",
  email: "amelia@aureliaatelier.com",
  phone: "+1 (415) 238-4457",
  gender: "Female",
  dob: "05 March 1992",
};

const initialAddress = {
  street: "40 Mercer Street",
  city: "New York, NY 10013",
  country: "United States",
};

const orders = [
  {
    id: "#A1253",
    date: "12 Aug 2026",
    status: "Shipped",
    total: "$420.00",
    badgeClass: "bg-[#f5e3e6] text-[#7a1f2c]",
    details: "Order confirmed and currently on the way to your delivery address.",
  },
  {
    id: "#A1197",
    date: "02 Aug 2026",
    status: "Delivered",
    total: "$390.00",
    badgeClass: "bg-[#e7f5ef] text-[#185b43]",
    details: "Delivered successfully to your default address on 05 Aug 2026.",
  },
  {
    id: "#A1128",
    date: "26 Jul 2026",
    status: "Processing",
    total: "$310.00",
    badgeClass: "bg-[#f6efe3] text-[#7a5e1d]",
    details: "Payment approved and your order is being prepared for dispatch.",
  },
];

const sidebarItems = [
  { label: "My Profile", target: "profile-information" },
  { label: "My Orders", target: "recent-orders" },
  { label: "Wishlist", href: "/favourites" },
  { label: "Addresses", target: "default-address" },
  { label: "My Cart", href: "/cart" },
  { label: "Logout", href: "/login" },
];

export default function ProfilePage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const [profile, setProfile] = useState(() => ({
    ...initialProfile,
    fullName: user.name || initialProfile.fullName,
    email: user.email || initialProfile.email,
  }));
  const [address, setAddress] = useState(initialAddress);
  const [activeSection, setActiveSection] = useState("profile-information");
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(orders[0].id);
  const [draftProfile, setDraftProfile] = useState(() => ({
    ...initialProfile,
    fullName: user.name || initialProfile.fullName,
    email: user.email || initialProfile.email,
  }));
  const [draftAddress, setDraftAddress] = useState(initialAddress);

  useEffect(() => {
    if (!user.isAuthenticated) {
      router.replace("/login");
      return;
    }

    setProfile((current) => ({
      ...current,
      fullName: user.name || current.fullName,
      email: user.email || current.email,
    }));
    setDraftProfile((current) => ({
      ...current,
      fullName: user.name || current.fullName,
      email: user.email || current.email,
    }));
  }, [router, user.email, user.isAuthenticated, user.name]);

  const handleSidebarClick = (item: (typeof sidebarItems)[number]) => {
    if (item.label === "Logout") {
      clearUser();
      showToast("You have been signed out");
      router.push("/login");
      return;
    }

    if (item.target) {
      setActiveSection(item.target);
      document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (item.href) {
      router.push(item.href);
    }
  };

  const handleProfileSave = () => {
    setProfile(draftProfile);
    setUser({ name: draftProfile.fullName, email: draftProfile.email, isAuthenticated: true });
    setEditingProfile(false);
    showToast("Profile updated");
  };

  const handleAddressSave = () => {
    setAddress(draftAddress);
    setEditingAddress(false);
    showToast("Address updated");
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Profile" }]} />

        <h1 className="text-[2.4rem] font-semibold tracking-[-0.05em] text-[#222222] sm:text-[3rem] lg:text-[3.4rem]">My Account</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f7f7f7] text-[1.4rem] font-semibold text-[#222222]">AH</div>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[#222222]">{profile.fullName}</h2>
                <p className="mt-1 text-sm text-[#6a6a6a]">{profile.email}</p>
                <div className="mt-5 w-full">
                  <Button
                    variant="secondary"
                    className="w-full justify-center"
                    onClick={() => {
                      setDraftProfile(profile);
                      setEditingProfile(true);
                    }}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>

            <nav className="rounded-[20px] border border-[#dddddd] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <ul className="space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = item.target ? activeSection === item.target : false;

                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => handleSidebarClick(item)}
                        className={`flex w-full items-center justify-between rounded-[12px] px-4 py-3 text-left text-sm transition ${
                          isActive || item.label === "Logout"
                            ? "bg-[#f7f7f7] font-medium text-[#222222]"
                            : "text-[#6a6a6a] hover:bg-[#f7f7f7] hover:text-[#222222]"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive ? <span className="h-2.5 w-2.5 rounded-full bg-[#ff385c]" /> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="space-y-6">
            <section id="profile-information" className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#222222]">Personal Information</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full px-4"
                  onClick={() => {
                    setDraftProfile(profile);
                    setEditingProfile(true);
                  }}
                >
                  <PencilLine className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </div>

              {editingProfile ? (
                <div className="mt-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-[#222222]">
                      <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Full Name</span>
                      <input
                        value={draftProfile.fullName}
                        onChange={(event) => setDraftProfile((current) => ({ ...current, fullName: event.target.value }))}
                        className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 text-sm text-[#222222] outline-none transition focus:border-[#ff385c]"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-[#222222]">
                      <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Email</span>
                      <input
                        value={draftProfile.email}
                        onChange={(event) => setDraftProfile((current) => ({ ...current, email: event.target.value }))}
                        className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 text-sm text-[#222222] outline-none transition focus:border-[#ff385c]"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-[#222222]">
                      <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Phone</span>
                      <input
                        value={draftProfile.phone}
                        onChange={(event) => setDraftProfile((current) => ({ ...current, phone: event.target.value }))}
                        className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 text-sm text-[#222222] outline-none transition focus:border-[#ff385c]"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-[#222222]">
                      <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Gender</span>
                      <input
                        value={draftProfile.gender}
                        onChange={(event) => setDraftProfile((current) => ({ ...current, gender: event.target.value }))}
                        className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 text-sm text-[#222222] outline-none transition focus:border-[#ff385c]"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-[#222222] md:col-span-2">
                      <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Date of Birth</span>
                      <input
                        value={draftProfile.dob}
                        onChange={(event) => setDraftProfile((current) => ({ ...current, dob: event.target.value }))}
                        className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 text-sm text-[#222222] outline-none transition focus:border-[#ff385c]"
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <Button variant="secondary" onClick={() => setEditingProfile(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleProfileSave}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[14px] bg-[#f7f7f7] p-4">
                    <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Full Name</div>
                    <div className="mt-2 text-base font-medium text-[#222222]">{profile.fullName}</div>
                  </div>
                  <div className="rounded-[14px] bg-[#f7f7f7] p-4">
                    <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Email</div>
                    <div className="mt-2 text-base font-medium text-[#222222]">{profile.email}</div>
                  </div>
                  <div className="rounded-[14px] bg-[#f7f7f7] p-4">
                    <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Phone</div>
                    <div className="mt-2 text-base font-medium text-[#222222]">{profile.phone}</div>
                  </div>
                  <div className="rounded-[14px] bg-[#f7f7f7] p-4">
                    <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Gender</div>
                    <div className="mt-2 text-base font-medium text-[#222222]">{profile.gender}</div>
                  </div>
                  <div className="rounded-[14px] bg-[#f7f7f7] p-4 md:col-span-2">
                    <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Date of Birth</div>
                    <div className="mt-2 text-base font-medium text-[#222222]">{profile.dob}</div>
                  </div>
                </div>
              )}
            </section>

            <section id="default-address" className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#222222]">Default Address</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full px-4"
                  onClick={() => {
                    setDraftAddress(address);
                    setEditingAddress(true);
                  }}
                >
                  <PencilLine className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </div>

              {editingAddress ? (
                <div className="mt-6 space-y-4">
                  <label className="block space-y-2 text-sm text-[#222222]">
                    <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Street</span>
                    <input
                      value={draftAddress.street}
                      onChange={(event) => setDraftAddress((current) => ({ ...current, street: event.target.value }))}
                      className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 text-sm text-[#222222] outline-none transition focus:border-[#ff385c]"
                    />
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-[#222222]">
                      <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">City</span>
                      <input
                        value={draftAddress.city}
                        onChange={(event) => setDraftAddress((current) => ({ ...current, city: event.target.value }))}
                        className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 text-sm text-[#222222] outline-none transition focus:border-[#ff385c]"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-[#222222]">
                      <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Country</span>
                      <input
                        value={draftAddress.country}
                        onChange={(event) => setDraftAddress((current) => ({ ...current, country: event.target.value }))}
                        className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 text-sm text-[#222222] outline-none transition focus:border-[#ff385c]"
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <Button variant="secondary" onClick={() => setEditingAddress(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddressSave}>Save Address</Button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex items-start gap-3 rounded-[14px] bg-[#f7f7f7] p-4">
                  <MapPin className="mt-0.5 h-4 w-4 text-[#ff385c]" />
                  <div className="text-sm leading-7 text-[#222222]">
                    {address.street}
                    <br />
                    {address.city}
                    <br />
                    {address.country}
                  </div>
                </div>
              )}
            </section>

            <section id="recent-orders" className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#222222]">Recent Orders</h2>
                <Link href="/checkout" className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.28em] text-[#222222] transition hover:text-[#ff385c]">
                  View all <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {orders.map((order) => {
                  const isSelected = selectedOrderId === order.id;

                  return (
                    <div key={order.id} className="rounded-[14px] border border-[#dddddd] bg-[#f7f7f7] p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="text-sm font-medium text-[#222222]">{order.id}</div>
                          <div className="mt-1 text-xs uppercase tracking-[0.25em] text-[#6a6a6a]">{order.date}</div>
                        </div>

                        <div className="flex items-center gap-3 md:justify-end">
                          <span className={`rounded-full px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.25em] ${order.badgeClass}`}>
                            {order.status}
                          </span>
                          <span className="text-base font-medium text-[#222222]">{order.total}</span>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full px-4 md:ml-2"
                          onClick={() => setSelectedOrderId(isSelected ? null : order.id)}
                        >
                          {isSelected ? "Hide Details" : "View Details"}
                        </Button>
                      </div>

                      {isSelected ? (
                        <div className="mt-4 rounded-[12px] border border-[#dddddd] bg-white p-4 text-sm leading-7 text-[#222222]">
                          <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[#6a6a6a]">Order Summary</div>
                          <p className="mt-2">{order.details}</p>
                          <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-[#6a6a6a]">
                            <span>2 items</span>
                            <span>Express Shipping</span>
                            <span>Tracking Ready</span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
