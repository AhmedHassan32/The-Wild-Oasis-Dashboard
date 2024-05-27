import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    // isPending instead of isLoading
    mutationFn: (id) => deleteCabinApi(id),
    // mutationFn: deleteCabin     // if same values in callback will be passed into function
    onSuccess: () => {
      toast.success("Cabin Successfully deleted");
      queryClient.invalidateQueries({
        // invalidating the cache as soon as the mutation is done (mutate function) so re-fetch will be automatically
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
