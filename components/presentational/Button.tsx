import { Button as RebassButton, ButtonProps as RebassButtonProps } from "rebass";
import { Ref, forwardRef } from "react";
import styles from './Button.module.css';

export default forwardRef(function (props: RebassButtonProps, ref: Ref<any>) {
    return (
        <RebassButton
            {...props}
            ref={ref}
            type="button"
            aria-label={'toggle menu'}
            color="White"
            bg="Medium"
            sx={{ borderRadius: 0, height: "100%", width: '100%'  }}
            className={styles.button}
        >{props.children}</RebassButton>
    );
});
