import { Input as RebassInput, InputProps as RebassInputProps } from "@rebass/forms";
import { Ref, forwardRef } from "react";

export default forwardRef(function (props: RebassInputProps, ref: Ref<any>) {
    return (
        <RebassInput
            {...props}
            ref={ref}
            sx={{
                borderColor: "Medium", borderRadius: 0, ':focus': {
                    borderRadius: 0,
                    borderColor: "Medium",
                    outline: 0
                }
            }} />
    );
})
