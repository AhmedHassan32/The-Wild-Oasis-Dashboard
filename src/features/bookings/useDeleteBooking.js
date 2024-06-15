import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    // isPending instead of isLoading
    mutationFn: (id) => deleteBookingApi(id),
    // mutationFn: deleteBooking     // if same values in callback will be passed into function
    onSuccess: () => {
      toast.success("Booking Successfully deleted");
      queryClient.invalidateQueries({
        // invalidating the cache as soon as the mutation is done (mutate function) so re-fetch will be automatically
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
