import { useForm } from "react-hook-form";
import Headers from "../Header";

let renderCount = 0;

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  developer: string;
};

export default function Form() {
  renderCount++

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful, isDirty, isValid, isValidating,  }
  } = useForm<FormValues>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />
      <label htmlFor="firstName">First Name:</label>
      <input
        {...register("firstName", { required: "This is required" })}
        id="firstName"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <label htmlFor="lastName">Last Name:</label>
      <input
        {...register("lastName", {
          required: "This is required",
          maxLength: { value: 4, message: "You exceeded the max length" }
        })}
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <label htmlFor="age">Age</label>
      <input
        type="number"
        {...register("age", {
          valueAsNumber: true,
          required: "This is required",
          max: { value: 100, message: ' Đã vượt quá tuổi'},
          min: { value: 1, message: ' Tuổi quá ít để submit'},
        })}
        id="age"
      />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="gender"></label>
      <select {...register("gender")} id="gender">
        <option value="">Select...</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>

      <label htmlFor="developer">Are you a developer?</label>
      <input {...register("developer")} value="yes" type="checkbox" />

      <input type="submit" />
    </form>
  );
}
