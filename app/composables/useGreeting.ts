import { computed } from "vue";

export const useGreeting = () => {
  const hour = computed(() => new Date().getHours());

  const greeting = computed(() => {
    if (hour.value >= 5 && hour.value < 12) return "Good morning";
    if (hour.value >= 12 && hour.value < 18) return "Good afternoon";
    if (hour.value >= 18 && hour.value < 22) return "Good evening";
    return "Good night";
  });

  const greetingIcon = computed(() => {
    if (hour.value >= 5 && hour.value < 12) return "lucide:sun";
    if (hour.value >= 12 && hour.value < 18) return "lucide:sun";
    if (hour.value >= 18 && hour.value < 22) return "lucide:sunset";
    return "lucide:moon";
  });

  const greetingColor = computed(() => {
    if (hour.value >= 5 && hour.value < 12) return "text-amber-500";
    if (hour.value >= 12 && hour.value < 18) return "text-amber-500";
    if (hour.value >= 18 && hour.value < 22) return "text-purple-500";
    return "text-indigo-400";
  });

  return { greeting, greetingIcon, greetingColor };
};
