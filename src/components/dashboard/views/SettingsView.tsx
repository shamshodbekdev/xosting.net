"use client";

import { useState } from "react";
import { Bell, ShieldCheck, UserRound, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useAuth } from "../AuthProvider";
import { Avatar } from "../Avatar";
import { useToast } from "../ToastProvider";
import { Card } from "../ui/Card";
import { Field, TextInput } from "../ui/FormControls";
import { PageHeader } from "../ui/PageHeader";
import { Switch } from "../ui/Switch";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_PASSWORD = 8;

export function SettingsView() {
  const t = useTranslations("Dashboard.Settings");

  return (
    <>
      <PageHeader title={t("title")} description={t("subtitle")} />
      <div className="space-y-6">
        <ProfileSection />
        <SecuritySection />
        <NotificationsSection />
      </div>
    </>
  );
}

function Section({
  id,
  icon: Icon,
  title,
  text,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <Card aria-labelledby={id} className="grid gap-6 lg:grid-cols-[18rem_1fr] lg:gap-10">
      <div>
        <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
          <Icon size={20} />
        </span>
        <h2 id={id} className="text-lg font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-gray-400">{text}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </Card>
  );
}

function ProfileSection() {
  const t = useTranslations("Dashboard.Settings.profile");
  const { user, updateProfile } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ fullName: user.fullName, email: user.email, phone: user.phone });
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((v) => ({ ...v, [key]: event.target.value }));
    if (key in errors) setErrors((v) => ({ ...v, [key]: undefined }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = {
      fullName: form.fullName.trim().length < 2 ? t("nameError") : undefined,
      email: EMAIL_PATTERN.test(form.email.trim()) ? undefined : t("emailError"),
    };
    setErrors(nextErrors);
    if (nextErrors.fullName || nextErrors.email) return;

    updateProfile({ fullName: form.fullName.trim(), email: form.email.trim(), phone: form.phone.trim() });
    toast(t("saved"));
  };

  return (
    <Section id="settings-profile" icon={UserRound} title={t("title")} text={t("text")}>
      <form onSubmit={submit} noValidate className="space-y-5">
        <div className="flex items-center gap-4">
          <Avatar name={form.fullName || user.fullName} className="h-14 w-14 text-lg" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">{user.fullName}</p>
            <p className="truncate text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field id="profile-name" label={t("fullName")} error={errors.fullName}>
              <TextInput id="profile-name" value={form.fullName} onChange={set("fullName")} autoComplete="name" error={errors.fullName} />
            </Field>
          </div>
          <Field id="profile-email" label={t("email")} error={errors.email}>
            <TextInput id="profile-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" error={errors.email} />
          </Field>
          <Field id="profile-phone" label={t("phone")}>
            <TextInput id="profile-phone" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" />
          </Field>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="w-full sm:w-auto">{t("save")}</Button>
        </div>
      </form>
    </Section>
  );
}

const emptyPasswords = { current: "", next: "", confirm: "" };

function SecuritySection() {
  const t = useTranslations("Dashboard.Settings.security");
  const toast = useToast();
  const [form, setForm] = useState(emptyPasswords);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof emptyPasswords, string>>>({});

  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((v) => ({ ...v, [key]: event.target.value }));
    if (errors[key]) setErrors((v) => ({ ...v, [key]: undefined }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = {
      current: form.current ? undefined : t("currentError"),
      next: form.next.length < MIN_PASSWORD ? t("minError", { min: MIN_PASSWORD }) : undefined,
      confirm: form.confirm !== form.next || !form.confirm ? t("matchError") : undefined,
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setForm(emptyPasswords);
    toast(t("success"));
  };

  return (
    <Section id="settings-security" icon={ShieldCheck} title={t("title")} text={t("text")}>
      <form onSubmit={submit} noValidate className="space-y-5">
        <Field id="password-current" label={t("current")} error={errors.current}>
          <TextInput id="password-current" type="password" value={form.current} onChange={set("current")} autoComplete="current-password" error={errors.current} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="password-new" label={t("new")} error={errors.next} hint={t("hint", { min: MIN_PASSWORD })}>
            <TextInput id="password-new" type="password" value={form.next} onChange={set("next")} autoComplete="new-password" error={errors.next} />
          </Field>
          <Field id="password-confirm" label={t("confirm")} error={errors.confirm}>
            <TextInput id="password-confirm" type="password" value={form.confirm} onChange={set("confirm")} autoComplete="new-password" error={errors.confirm} />
          </Field>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="w-full sm:w-auto">{t("submit")}</Button>
        </div>
      </form>
    </Section>
  );
}

type NotificationKey = "invoices" | "tickets" | "news";

function NotificationsSection() {
  const t = useTranslations("Dashboard.Settings.notifications");
  const toast = useToast();
  const [prefs, setPrefs] = useState<Record<NotificationKey, boolean>>({ invoices: true, tickets: true, news: false });

  const toggle = (key: NotificationKey, value: boolean) => {
    setPrefs((v) => ({ ...v, [key]: value }));
    toast(t("saved"));
  };

  return (
    <Section id="settings-notifications" icon={Bell} title={t("title")} text={t("text")}>
      <div className="divide-y divide-white/5">
        {(["invoices", "tickets", "news"] as const).map((key) => (
          <div key={key} className="py-4 first:pt-0 last:pb-0">
            <Switch
              id={`notify-${key}`}
              checked={prefs[key]}
              onChange={(value) => toggle(key, value)}
              label={t(key)}
              description={t(`${key}Text`)}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
