import { AnimatePresence, motion } from "framer-motion";
import React, { cloneElement } from "react";
import { Arrow, useHover, useLayer } from "react-laag";

export function Tooltip({ children, text }: { children: any, text: string }) {
    const [isOver, hoverProps] = useHover({ hideOnScroll: true, delayEnter: 100, delayLeave: 300 });

    const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
        isOpen: isOver,
        auto: true,
        triggerOffset: 8
    });

    let trigger;

    if (["string", "number"].includes(typeof children)) {
        trigger = (
            <span className="tooltip-text-wrapper" {...triggerProps} {...hoverProps}>
                {children}
            </span>
        );
    } else {
        trigger = cloneElement(children, {
            ...triggerProps,
            ...hoverProps
        });
    }
    return (
        <>
            {trigger}
            {
                renderLayer(
                    <AnimatePresence>
                        {isOver && (
                            <motion.div
                                className="bg-black text-white text-sm font-light p-2 rounded"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.1 }}
                                {...layerProps}>
                                {text}
                                <Arrow
                                    {...arrowProps}
                                    backgroundColor="#000000"
                                    borderColor="#FFFFFF"
                                    borderWidth={1}
                                    size={6}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                )
            }
        </>
    );
};
