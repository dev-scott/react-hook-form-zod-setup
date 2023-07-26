import { useForm } from "react-hook-form";
import "./App.css";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type formData = {
  firtname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function App() {
  const schema: ZodType<formData> = z
    .object({
      firtname: z.string().min(2).max(30),
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: formData) => {
    console.log("it is work", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitData)}>
        <label>firtname:</label>
        <input type="text" {...register("firtname")} />
        {errors.firtname && <span>{errors.firtname.message}</span>}

        <label>email:</label>
        <input type="text" {...register("email")} />

        <label>password</label>
        <input type="text" {...register("password")} />

        <label>confirm password:</label>
        <input type="text" {...register("confirmPassword")} />
        <button>submit</button>
      </form>
    </div>
  );
}

export default App;
