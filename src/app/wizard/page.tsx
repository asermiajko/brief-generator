import WizardShell from "@/components/wizard/WizardShell";

export const metadata = {
  title: "Визард — Генератор брифа на сайт ЖК",
};

export default function WizardPage() {
  return (
    <div className="py-8">
      <WizardShell />
    </div>
  );
}
