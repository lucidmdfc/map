import { useCallback } from "react";

export const useCategory = () => {
  const formatCategoryLabel = useCallback((label: string) => {
    return label.charAt(0).toUpperCase() + label.slice(1);
  }, []);

  return { formatCategoryLabel };
}; 