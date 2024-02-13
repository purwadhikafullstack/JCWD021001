import * as Yup from "yup";

export const emailSchema = Yup.object().shape({
	email: Yup.string()
		.email("email is invalid")
		.required("email is required"),
});