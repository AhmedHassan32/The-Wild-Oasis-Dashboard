import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isPending) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

// Hi Jonas and fellow learners,

// Here are 2 suggestions for improvements:

//   - If you assign the same value to the id of the < Input > as the variable, e.g.minBookingLength,
//   rather than min - nights, then you don't need to pass an additional field into the handleUpdate,
//     and instead simply get the id from the target

//   - You should add validation to make sure you don't update the value if nothing has changed.
// This can be done by comparing the value inside handleUpdate to the defaultValue of the target.

// Here is the code which highlights this approach.Simply destructure the value, id,
//   and defaultValue from e.target to do some additional validation and simplify the update.

// The e.target.defaultValue = value helps handle the case where if you click in and out of the input multiple times,
//   then it will update multiple times because the defaultValue differs from the new value
//   It's not the prettiest way to update the default, but it works.

// Hope this helps.
// function handleUpdate(e) {
//     const { value, id, defaultValue } = e.target;

//     if (!value || !id || defaultValue === value) return;
//     updateSetting({ [id]: value });
//     e.target.defaultValue = value;
//   }

//   return (
//     <Form>
//       <FormRow label="Minimum nights/booking">
//         <Input
//           type="number"
//           id="minBookingLength"
//           disabled={isUpdating}
//           defaultValue={minBookingLength}
//           onBlur={(e) => handleUpdate(e)}
//         />
//       </FormRow>
// great idea! Just wanted to mention that e.target.value will be string so the comparison should either be
// Number(e.target.value) === defaultValue or e.target.value == defaultValue  or the comparison won't be effective.

// ...it's probably also a good idea to convert it to an integer when it gets passed into updateSetting()
