import type { Ref } from "vue";
import type { AuthUser } from "~/types/trpc";

export const useFirstName = (user: Ref<AuthUser | null | undefined>) => {
  return computed(() => {
    const fullName = user.value?.name?.trim() ?? "";
    if (fullName === "") return "there";
    return fullName.split(/\s+/)[0] ?? fullName;
  });
};
