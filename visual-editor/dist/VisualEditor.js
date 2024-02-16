var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// react-shim.js
import { jsx } from "@emotion/react";
import { Fragment } from "react";

// src/VisualEditor.tsx
import React10, { useEffect as useEffect16, useMemo as useMemo9, useRef as useRef13 } from "react";
import { createRoot as createRoot3 } from "react-dom/client";

// src/components/Sortable.tsx
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// src/components/ui/Button.tsx
import styled from "@emotion/styled";
import { jsx as jsx2, jsxs } from "@emotion/react/jsx-runtime";
function Button({
  children,
  icon: IconElement,
  size = "default",
  secondary = false,
  outline = false,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    BaseButton,
    {
      css: [
        secondary && Secondary,
        size === "small" && Small,
        outline && Outline
      ],
      ...props,
      children: [
        IconElement && /* @__PURE__ */ jsx2(IconElement, { size: 20 }),
        children
      ]
    }
  );
}
var BaseButton = styled.button({
  outline: "none",
  display: "flex",
  alignItems: "center",
  gap: "0.5em",
  fontWeight: 700,
  backgroundColor: "var(--ve-primary)",
  border: "none",
  color: "#fff",
  alignSelf: "flex-end",
  fontSize: "0.9rem",
  height: 48,
  padding: "0 1em",
  lineHeight: "1.25rem",
  cursor: "pointer",
  borderRadius: 4,
  transition: "background-color 0.3s",
  "&:hover, &:focus": { backgroundColor: "var(--ve-primary-hover)" }
});
var Secondary = {
  backgroundColor: "transparent",
  color: "var(--ve-primary)",
  "&:hover, &:focus": { backgroundColor: "var(--ve-primary-light)" }
};
var Small = {
  height: 40
};
var Outline = {
  border: "solid 1px var(--ve-primary)",
  background: "transparent",
  color: "var(--ve-primary)",
  "&:hover, &:focus": { backgroundColor: "var(--ve-primary)", color: "#FFF" }
};

// src/components/ui/Input.tsx
import styled2 from "@emotion/styled";
var Input = styled2.input({
  color: "var(--ve-color)",
  background: "transparent",
  padding: ".5rem .75em",
  lineHeight: "1.25rem",
  borderRadius: ".2rem",
  display: "block",
  width: "100%",
  border: "1px solid var(--ve-field-border)",
  boxShadow: "var(--ve-field-shadow)",
  "&:focus": {
    borderColor: "var(--ve-primary)",
    outline: "0",
    boxShadow: "0 0 0 0.25rem rgb(23 113 230 / 25%)"
  }
});

// src/components/ui/UnstyledButton.tsx
import styled3 from "@emotion/styled";
var UnstyledButton = styled3.button({
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  margin: 0,
  color: "inherit"
});

// src/components/ui/Tooltip.tsx
import Tippy from "@tippyjs/react";
import styled4 from "@emotion/styled";
import { jsx as jsx3 } from "@emotion/react/jsx-runtime";
function Tooltip({ content, children, visible, trigger }) {
  const tippyProps = {};
  if (trigger === "click") {
    tippyProps.trigger = trigger;
    tippyProps.hideOnClick = true;
    tippyProps.interactive = true;
  }
  return /* @__PURE__ */ jsx3(StyledTippy, { content, visible, ...tippyProps, children });
}
var StyledTippy = styled4(Tippy)({
  backgroundColor: "#202227",
  color: "#FFF",
  padding: ".2em .5em",
  position: "relative",
  borderRadius: "4px",
  fontSize: ".75em",
  lineHeight: 1.4,
  boxShadow: "rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px",
  outline: "0",
  transitionProperty: "transform, visibility, opacity",
  "&[data-animation=fade][data-state=hidden]": {
    transform: "translateY(-5px)",
    opacity: 0
  },
  "&[data-placement^=top] > .tippy-arrow": { bottom: "0" },
  "& .tippy-arrow": {
    width: "16px",
    height: "16px",
    color: "#202227"
  },
  "&[data-placement^=top] > .tippy-arrow::before": {
    bottom: "-7px",
    left: "0",
    borderWidth: "8px 8px 0",
    borderTopColor: "initial",
    transformOrigin: "center top"
  },
  "& .tippy-arrow::before": {
    content: '""',
    position: "absolute",
    borderColor: "transparent",
    borderStyle: "solid"
  },
  "&[data-placement^=bottom] > .tippy-arrow::before": {
    top: "-19px",
    left: "0",
    borderWidth: "8px 8px 0",
    borderTopColor: "initial",
    transform: "rotate(180deg)",
    transformOrigin: "center top"
  }
});

// src/components/ui/ButtonIcon.tsx
import { css } from "@emotion/react";
import styled5 from "@emotion/styled";
import { jsx as jsx4 } from "@emotion/react/jsx-runtime";
function ButtonIcon({
  danger,
  success,
  rotate,
  title,
  ...props
}) {
  const style = rotate ? { transform: `rotate(${rotate}deg)` } : void 0;
  const button = /* @__PURE__ */ jsx4(
    BaseButton2,
    {
      ...props,
      "aria-label": title,
      css: [danger && Danger, success && Success],
      style
    }
  );
  if (title) {
    return /* @__PURE__ */ jsx4(Tooltip, { content: title, trigger: "focus", children: button });
  }
  return button;
}
var BaseButton2 = styled5.button({
  flex: "none",
  width: 40,
  height: 40,
  borderRadius: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  transition: "background-color 0.3s, transform 0.3s",
  border: "none",
  outline: "none",
  cursor: "pointer",
  color: "var(--ve-color-light)",
  background: "var(--ve-background)",
  "&:hover, &:focus": {
    backgroundColor: "var(--ve-hover)",
    color: "var(--ve-color)"
  }
});
var Danger = {
  color: "var(--ve-danger)",
  "&:hover, &:focus": {
    color: "var(--ve-danger)",
    backgroundColor: "var(--ve-danger-light)"
  }
};
var Success = {
  color: "#059669",
  "&:hover, &:focus": {
    color: "#059669",
    backgroundColor: "rgba(110, 231, 183, .2)"
  }
};
var Flipped = css({
  transform: "rotate(180deg)"
});

// src/components/ui/DragHandle.tsx
import styled6 from "@emotion/styled";
var DragHandle = styled6.div({
  width: 10,
  position: "absolute",
  top: ".5rem",
  left: 3,
  bottom: ".5rem",
  cursor: "move",
  background: "radial-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1) 30%, rgba(0,0,0,0) 31%, rgba(0,0,0,0.0)) left top / 5px 5px repeat"
});

// src/components/ui/Label.tsx
import styled7 from "@emotion/styled";
var Label = styled7.label({
  display: "block",
  marginBottom: ".5em",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
});

// src/components/ui/Field.tsx
import styled8 from "@emotion/styled";
import { jsx as jsx5, jsxs as jsxs2 } from "@emotion/react/jsx-runtime";
function Field({
  children,
  label,
  help,
  type = "text",
  options,
  tooltip,
  icon,
  ...props
}) {
  if (!children) {
    if (options) {
      children = /* @__PURE__ */ jsx5(Select, { ...props, children: options.map((option, key) => {
        return /* @__PURE__ */ jsx5("option", { value: option.value, children: option.label }, key);
      }) });
    } else if (["text", "number"].includes(type)) {
      children = /* @__PURE__ */ jsx5(Input, { type, ...props });
    } else if (type === "textarea") {
      children = /* @__PURE__ */ jsx5(Input, { as: "textarea", ...props });
    } else {
      throw new Error("Cannot render this type of field : " + type);
    }
  }
  if (tooltip) {
    children = /* @__PURE__ */ jsx5(Tooltip, { content: tooltip, children });
  }
  return /* @__PURE__ */ jsxs2("div", { children: [
    label && /* @__PURE__ */ jsx5(Label, { htmlFor: props.id, children: label }),
    /* @__PURE__ */ jsxs2(Wrapper, { children: [
      children,
      icon && /* @__PURE__ */ jsx5(Icon, { children: icon })
    ] }),
    help && /* @__PURE__ */ jsx5(HelpMessage, { children: help })
  ] });
}
var Select = Input.withComponent("select");
var HelpMessage = styled8.div({
  fontStyle: "italic",
  marginTop: ".5em",
  fontSize: ".8em"
});
var Wrapper = styled8.div({
  position: "relative"
});
var Icon = styled8.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bottom: 0,
  color: "var(--ve-field-border)",
  cursor: "pointer",
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  width: 40
});

// src/components/ui/Modal.tsx
import { Content, Overlay, Root, Title } from "@radix-ui/react-dialog";

// src/functions/functions.ts
function prevent(callback) {
  if (!callback) {
    return;
  }
  return (e) => {
    e.preventDefault();
    callback(e);
  };
}
function preventPropagation(callback) {
  if (!callback) {
    return;
  }
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    callback(e);
  };
}

// src/components/ui/Modal.tsx
import styled9 from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { jsx as jsx6, jsxs as jsxs3 } from "@emotion/react/jsx-runtime";
function Modal({
  children,
  title,
  visible,
  onVisibilityChange
}) {
  return /* @__PURE__ */ jsxs3(Root, { open: visible, onOpenChange: onVisibilityChange, children: [
    /* @__PURE__ */ jsx6(ModalOverlay, {}),
    /* @__PURE__ */ jsxs3(ModalContent, { children: [
      /* @__PURE__ */ jsx6(ModalTitle, { children: title }),
      /* @__PURE__ */ jsx6("div", { children }),
      /* @__PURE__ */ jsx6(ModalClose, { onClick: prevent(() => onVisibilityChange(false)), children: /* @__PURE__ */ jsx6(IconCross, { size: 16 }) })
    ] })
  ] });
}
var FadeIn = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});
var ContentIn = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(-48%) scale(.96)"
  },
  to: {
    opacity: 1,
    transform: "translateY(-50%) scale(1)"
  }
});
var ModalOverlay = styled9(Overlay)({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  animation: `${FadeIn} 300ms cubic-bezier(0.16, 1, 0.3, 1)`
});
var ModalContent = styled9(Content)({
  position: "fixed",
  top: "50%",
  left: "0",
  right: "0",
  zIndex: 51,
  marginLeft: "auto",
  marginRight: "auto",
  width: "calc(100% - 2rem)",
  maxWidth: "1290px",
  borderRadius: "8px",
  backgroundColor: "var(--ve-background)",
  padding: "1.5rem 2rem",
  transform: "translateY(-50%)",
  animation: `${ContentIn} 300ms cubic-bezier(0.16, 1, 0.3, 1)`
});
var ModalTitle = styled9(Title)({
  fontSize: "1.5rem",
  fontWeight: 500,
  margin: 0,
  padding: 0
});
var ModalClose = styled9(ButtonIcon)({
  position: "absolute",
  top: "1.2rem",
  right: "1.5rem"
});

// src/components/ui/Tabs.tsx
import React, { useState } from "react";
import {
  Tabs as RadixTabs,
  TabsContent,
  TabsList as RadixTabsList,
  TabsTrigger
} from "@radix-ui/react-tabs";
import styled10 from "@emotion/styled";
import { jsx as jsx7, jsxs as jsxs4 } from "@emotion/react/jsx-runtime";
var TabsList = styled10(RadixTabsList)({
  display: "flex",
  gap: ".5rem",
  marginBottom: "1em"
});
var TabButton = styled10(TabsTrigger)({
  backgroundColor: "var(--ve-hover)",
  borderRadius: 56,
  padding: ".6rem 1rem",
  border: "none",
  fontWeight: 500,
  cursor: "pointer",
  transition: "color .3s, background-color .3s"
});
var TabButtonSelected = {
  color: "var(--ve-primary)",
  backgroundColor: "var(--ve-primary-light)"
};
function Tabs({ children, ...props }) {
  const childrenArray = React.Children.toArray(
    children
  );
  const [currentTab, setCurrentTab] = useState(childrenArray[0]?.props.title);
  return /* @__PURE__ */ jsxs4(RadixTabs, { value: currentTab, onValueChange: setCurrentTab, children: [
    /* @__PURE__ */ jsx7(TabsList, { ...props, children: childrenArray.map((child) => /* @__PURE__ */ jsx7(
      TabButton,
      {
        css: [currentTab === child.props.title && TabButtonSelected],
        value: child.props.title,
        children: child.props.title
      },
      child.props.title
    )) }),
    childrenArray.map((child) => /* @__PURE__ */ jsx7(TabsContent, { value: child.props.title, children: child }, child.props.title))
  ] });
}
function Tab(props) {
  return /* @__PURE__ */ jsx7("div", { ...props });
}
Tabs.Tab = Tab;

// src/components/ui/Flex.tsx
import { forwardRef } from "react";
import styled11 from "@emotion/styled";
import { jsx as jsx8 } from "@emotion/react/jsx-runtime";
var Flex = forwardRef(
  ({ between, column, ...props }, ref) => {
    return /* @__PURE__ */ jsx8(
      Wrapper2,
      {
        ...props,
        ref,
        css: [between && Between, column && Column]
      }
    );
  }
);
Flex.displayName = "Flex";
var Wrapper2 = styled11.div(
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  ({ gap = 1 }) => ({
    gap: gap + "em",
    gridGap: gap + "em"
  })
);
var Between = {
  justifyContent: "space-between"
};
var Column = {
  display: "grid",
  alignContent: "flex-start",
  gridTemplateColumns: "1fr",
  alignItems: "flex-start"
};

// src/components/ui/Animation/AnimatedPresence.tsx
import {
  useEffect as useEffect2,
  useRef as useRef2,
  isValidElement,
  cloneElement as cloneElement2,
  Children,
  useContext
} from "react";

// src/components/ui/Animation/hooks.ts
import sync from "framesync";
import { useState as useState2, useCallback, useRef, useEffect } from "react";
function useUnmountEffect(callback) {
  return useEffect(() => () => callback(), []);
}
function useForceUpdate() {
  const isUnmountingRef = useRef(false);
  const [forcedRenderCount, setForcedRenderCount] = useState2(0);
  useUnmountEffect(() => isUnmountingRef.current = true);
  const forceRender = useCallback(() => {
    !isUnmountingRef.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
  const deferredForceRender = useCallback(
    () => sync.postRender(forceRender),
    [forceRender]
  );
  return [deferredForceRender, forcedRenderCount];
}
function useConstant(init) {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// src/components/ui/Animation/PresenceChild.tsx
import * as React2 from "react";
import { useMemo } from "react";
import { ClassNames } from "@emotion/react";
import { jsx as jsx9 } from "@emotion/react/jsx-runtime";
var Base = {
  animationDuration: ".7s",
  animationTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
  animateFill: "both"
};
var PresenceChild = ({
  children,
  isPresent,
  onExitComplete,
  in: inKeyframes,
  out: outKeyframes
}) => {
  const presenceChildren = useConstant(newChildrenMap);
  const animationName = isPresent ? inKeyframes : outKeyframes;
  useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  return /* @__PURE__ */ jsx9(ClassNames, { children: ({ css: css4, cx }) => React2.cloneElement(children, {
    className: cx(
      children.props.className,
      css4({
        ...Base,
        animationName: animationName.toString()
      })
    ),
    onAnimationEnd: isPresent ? null : onExitComplete
  }) });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}

// src/components/ui/Animation/LayoutGroupContext.tsx
import { createContext } from "react";
var LayoutGroupContext = createContext({});

// src/components/ui/Animation/AnimatedPresence.tsx
import { Fragment as Fragment2, jsx as jsx10 } from "@emotion/react/jsx-runtime";
function getChildKey(child) {
  return child.key || "";
}
function updateChildLookup(children, allChildren) {
  const seenChildren = true ? /* @__PURE__ */ new Set() : null;
  children.forEach((child) => {
    const key = getChildKey(child);
    if (seenChildren) {
      if (seenChildren.has(key)) {
        console.warn(
          `Children of AnimatePresence require unique keys. "${key}" is a duplicate.`
        );
      }
      seenChildren.add(key);
    }
    allChildren.set(key, child);
  });
}
function onlyElements(children) {
  const filtered = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
var AnimatePresence = ({ children, in: inKeyframes, out: outKeyframes, exitBeforeEnter }) => {
  let [forceRender] = useForceUpdate();
  const forceRenderLayoutGroup = useContext(LayoutGroupContext).forceRender;
  if (forceRenderLayoutGroup)
    forceRender = forceRenderLayoutGroup;
  const isInitialRender = useRef2(true);
  const isMounted = useRef2(true);
  useEffect2(
    () => () => {
      isMounted.current = false;
    },
    []
  );
  const filteredChildren = onlyElements(children);
  const presentChildren = useRef2(filteredChildren);
  const allChildren = useRef2(/* @__PURE__ */ new Map()).current;
  const exiting = useRef2(/* @__PURE__ */ new Set()).current;
  updateChildLookup(filteredChildren, allChildren);
  if (isInitialRender.current) {
    isInitialRender.current = false;
    return /* @__PURE__ */ jsx10(Fragment2, { children: filteredChildren.map((child) => /* @__PURE__ */ jsx10(
      PresenceChild,
      {
        isPresent: true,
        in: inKeyframes,
        out: outKeyframes,
        children: child
      },
      getChildKey(child)
    )) });
  }
  let childrenToRender = [...filteredChildren];
  const presentKeys = presentChildren.current.map(getChildKey);
  const targetKeys = filteredChildren.map(getChildKey);
  const numPresent = presentKeys.length;
  for (let i = 0; i < numPresent; i++) {
    const key = presentKeys[i] || "";
    if (targetKeys.indexOf(key) === -1) {
      exiting.add(key);
    } else {
      exiting.delete(key);
    }
  }
  if (exitBeforeEnter && exiting.size) {
    childrenToRender = [];
  }
  exiting.forEach((key) => {
    if (targetKeys.indexOf(key) !== -1)
      return;
    const child = allChildren.get(key);
    if (!child)
      return;
    const insertionIndex = presentKeys.indexOf(key);
    const onExit = () => {
      allChildren.delete(key);
      exiting.delete(key);
      const removeIndex = presentChildren.current.findIndex(
        (presentChild) => presentChild.key === key
      );
      presentChildren.current.splice(removeIndex, 1);
      if (!exiting.size) {
        presentChildren.current = filteredChildren;
        if (!isMounted.current) {
          return;
        }
        forceRender();
      }
    };
    childrenToRender.splice(
      insertionIndex,
      0,
      /* @__PURE__ */ jsx10(
        PresenceChild,
        {
          isPresent: false,
          onExitComplete: onExit,
          in: inKeyframes,
          out: outKeyframes,
          children: child
        },
        getChildKey(child)
      )
    );
  });
  childrenToRender = childrenToRender.map((child) => {
    const key = child.key;
    return exiting.has(key) ? child : /* @__PURE__ */ jsx10(
      PresenceChild,
      {
        isPresent: true,
        in: inKeyframes,
        out: outKeyframes,
        children: child
      },
      getChildKey(child)
    );
  });
  presentChildren.current = childrenToRender;
  if (exitBeforeEnter && childrenToRender.length > 1) {
    console.warn(
      `You're attempting to animate multiple children within AnimatePresence, but its exitBeforeEnter prop is set to true. This will lead to odd visual behaviour.`
    );
  }
  return /* @__PURE__ */ jsx10(Fragment2, { children: exiting.size ? childrenToRender : childrenToRender.map((child) => cloneElement2(child)) });
};

// src/components/ui/Flash.tsx
import styled12 from "@emotion/styled";
import { keyframes as keyframes2 } from "@emotion/react";
import { jsx as jsx11, jsxs as jsxs5 } from "@emotion/react/jsx-runtime";
function Flash({
  children,
  action,
  onClick,
  duration,
  onHide
}) {
  return /* @__PURE__ */ jsx11(AnimatePresence, { in: FlashIn, out: FlashOut, children: children && /* @__PURE__ */ jsxs5(Wrapper3, { between: true, children: [
    /* @__PURE__ */ jsx11("div", { children }),
    action && /* @__PURE__ */ jsx11(FlashButton, { size: "small", onClick: prevent(onClick), children: action }),
    duration && /* @__PURE__ */ jsx11(
      Progress,
      {
        onAnimationEnd: preventPropagation(onHide),
        style: { animationDuration: `${duration}s` }
      }
    )
  ] }) });
}
var Wrapper3 = styled12(Flex)({
  position: "fixed",
  bottom: "1rem",
  right: "2rem",
  color: "var(--ve-background)",
  background: "var(--ve-dark)",
  zIndex: 1001,
  padding: "1em",
  borderRadius: "4px",
  width: "460px",
  fontWeight: 500
});
var FlashButton = styled12(Button)({
  border: "solid 1px var(--ve-background)",
  backgroundColor: "transparent"
});
var ProgressKeyframe = keyframes2({
  from: {
    transform: "scaleX(0)"
  },
  to: {
    transform: "scaleX(1)"
  }
});
var Progress = styled12.div({
  display: "block",
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  height: "4px",
  transformOrigin: "0 0",
  backgroundColor: "var(--ve-primary)",
  animation: `${ProgressKeyframe} 1s both linear`
});
var FlashIn = keyframes2({
  from: {
    transform: "translateX(3em);",
    opacity: 0
  },
  to: {
    transform: "translateX(0)",
    opacity: 1
  }
});
var FlashOut = keyframes2({
  from: {
    transform: "translateX(0)",
    opacity: 1
  },
  to: {
    transform: "translateX(-3em);",
    opacity: 0
  }
});

// src/components/ui/Styles.ts
var Styles = {
  Mosaic: {
    "--ve-transparentColor": "#ffffff",
    backgroundColor: "#d0d0d0",
    backgroundImage: "linear-gradient(45deg, var(--ve-transparentColor) 25%, transparent 25%), linear-gradient(-45deg, var(--ve-transparentColor) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--ve-transparentColor) 75%), linear-gradient(-45deg, transparent 75%, var(--ve-transparentColor) 75%)",
    backgroundSize: "10px 10px",
    backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px"
  },
  FocusState: {
    borderColor: "var(--ve-primary)",
    outline: 0,
    boxShadow: "0 0 0 0.25rem rgb(23 113 230 / 25%)"
  }
};

// src/components/ui/Card.tsx
import styled13 from "@emotion/styled";
var Card = styled13.div(
  {
    padding: ".8em .6em .8em 1.4em",
    backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
    transition: "box-shadow .3s!important"
  },
  (props) => props.hoverable ? {
    "&:hover": {
      boxShadow: "var(--ve-shadow-dragging)",
      zIndex: 10
    }
  } : {}
);

// src/components/ui/Spinner.tsx
import { keyframes as keyframes3 } from "@emotion/react";
import styled14 from "@emotion/styled";
import { jsx as jsx12, jsxs as jsxs6 } from "@emotion/react/jsx-runtime";
var SpinnerKeyframes = keyframes3({
  from: {
    transform: "rotate(0deg)"
  },
  to: {
    transform: "rotate(-360deg)"
  }
});
var SpinnerWrapper = styled14.div(
  {
    position: "absolute",
    top: "calc(50% - var(--size) * 0.5)",
    left: "calc(50% - var(--size) * 0.5)",
    width: "var(--size)",
    height: "var(--size)",
    animation: `${SpinnerKeyframes} 1.4s infinite linear`,
    svg: {
      display: "block",
      width: "var(--size)",
      height: "var(--size)"
    }
  },
  ({ size = 30 }) => ({
    "--size": `${size}px`
  })
);
function Spinner(props) {
  return /* @__PURE__ */ jsx12(SpinnerWrapper, { ...props, children: /* @__PURE__ */ jsxs6("svg", { viewBox: "0 0 60 60", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx12(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60ZM30 50C41.0457 50 50 41.0457 50 30C50 18.9543 41.0457 10 30 10C18.9543 10 10 18.9543 10 30C10 41.0457 18.9543 50 30 50Z",
        fill: "url(#paint0_linear_313_15)"
      }
    ),
    /* @__PURE__ */ jsx12(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10 30H0C0 46.5685 13.4315 60 30 60V50C18.9543 50 10 41.0457 10 30Z",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ jsx12("defs", { children: /* @__PURE__ */ jsxs6(
      "linearGradient",
      {
        id: "paint0_linear_313_15",
        x1: "30",
        y1: "30",
        x2: "17",
        y2: "30",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ jsx12("stop", { stopColor: "currentColor", stopOpacity: "0" }),
          /* @__PURE__ */ jsx12(
            "stop",
            {
              offset: "0.198062",
              stopColor: "currentColor",
              stopOpacity: "0.217786"
            }
          ),
          /* @__PURE__ */ jsx12(
            "stop",
            {
              offset: "0.434425",
              stopColor: "currentColor",
              stopOpacity: "0.477687"
            }
          ),
          /* @__PURE__ */ jsx12("stop", { offset: "1", stopColor: "currentColor" })
        ]
      }
    ) })
  ] }) });
}

// src/components/ui/Icons.tsx
import { jsx as jsx13, jsxs as jsxs7 } from "@emotion/react/jsx-runtime";
function IconPhone({ size = 18 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          fill: "currentColor",
          d: "M7 4v16h10V4H7zM6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm6 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        }
      )
    }
  );
}
function IconDesktop({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          fill: "currentColor",
          d: "M4 16h16V5H4v11zm9 2v2h4v2H7v-2h4v-2H2.992A.998.998 0 0 1 2 16.993V4.007C2 3.451 2.455 3 2.992 3h18.016c.548 0 .992.449.992 1.007v12.986c0 .556-.455 1.007-.992 1.007H13z"
        }
      )
    }
  );
}
function IconCheck({ size = 18 }) {
  return /* @__PURE__ */ jsxs7(
    "svg",
    {
      width: size,
      height: size,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 16 16",
      children: [
        /* @__PURE__ */ jsx13(
          "path",
          {
            fill: "currentColor",
            d: "M13.315 2.716A7.461 7.461 0 102.763 13.268 7.461 7.461 0 0013.315 2.716zM8.039 14.454a6.468 6.468 0 01-6.46-6.46 6.468 6.468 0 016.46-6.462A6.468 6.468 0 0114.5 7.992a6.468 6.468 0 01-6.46 6.461z"
          }
        ),
        /* @__PURE__ */ jsx13(
          "path",
          {
            fill: "currentColor",
            d: "M6.915 9.556L4.62 7.262l-.708.707 3.002 3.002 5.234-5.235-.707-.707-4.527 4.527z"
          }
        )
      ]
    }
  );
}
function IconAlignLeft({ size = 24 }) {
  return /* @__PURE__ */ jsxs7(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsx13(
          "path",
          {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M10 6H5v13h5V6zM3 4v17h9V4H3z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx13(
          "path",
          {
            fill: "currentColor",
            d: "M22 7v2h-7V7h7zM22 11v2h-7v-2h7zM19 15v2h-4v-2h4z"
          }
        )
      ]
    }
  );
}
function IconAlignRight({ size = 24 }) {
  return /* @__PURE__ */ jsxs7(
    "svg",
    {
      width: size,
      height: size,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsx13(
          "path",
          {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M19 6h-5v13h5V6zm-7-2v17h9V4h-9z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx13(
          "path",
          {
            fill: "currentColor",
            d: "M10 7v2H3V7h7zM10 11v2H3v-2h7zM7 15v2H3v-2h4z"
          }
        )
      ]
    }
  );
}
function IconAlignTop({ size = 24 }) {
  return /* @__PURE__ */ jsxs7(
    "svg",
    {
      width: size,
      height: size,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsx13("defs", {}),
        /* @__PURE__ */ jsx13(
          "path",
          {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M19 5H5v5h14V5zM3 3v9h18V3H3z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx13("path", { fill: "currentColor", d: "M20 14v2H3v-2h17zM14 18v2H3v-2h11z" })
      ]
    }
  );
}
function IconAlignBottom({ size = 24 }) {
  return /* @__PURE__ */ jsxs7(
    "svg",
    {
      width: size,
      height: size,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsx13(
          "path",
          {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M19 14H5v5h14v-5zM3 12v9h18v-9H3z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx13(
          "path",
          {
            fill: "currentColor",
            d: "M20 4v2H3V4h17zM14 8v2H3V8h11zM7 12v2H3v-2h4z"
          }
        )
      ]
    }
  );
}
function IconTextLeft({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      width: size,
      height: size,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ jsx13("path", { fill: "currentColor", d: "M3 8V6h8v2zM3 13v-2h18v2zM3 18v-2h14v2z" })
    }
  );
}
function IconTextCenter({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      width: size,
      height: size,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ jsx13("path", { fill: "currentColor", d: "M8 8V6h8v2zM3 13v-2h18v2zM5 18v-2h14v2z" })
    }
  );
}
function IconTextRight({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      width: size,
      height: size,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ jsx13("path", { fill: "currentColor", d: "M11 8V6h10v2zM3 13v-2h18v2zM6 18v-2h15v2z" })
    }
  );
}
function IconCirclePlus({ size = 24 }) {
  return /* @__PURE__ */ jsxs7(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: [
        /* @__PURE__ */ jsx13("path", { fill: "none", d: "M0 0h24v24H0z" }),
        /* @__PURE__ */ jsx13(
          "path",
          {
            d: "M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z",
            fill: "currentColor"
          }
        )
      ]
    }
  );
}
function IconDown({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          d: "M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconTrash({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          d: "M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconCross({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          d: "M6.99999 5.58599L11.95 0.635986L13.364 2.04999L8.41399 6.99999L13.364 11.95L11.95 13.364L6.99999 8.41399L2.04999 13.364L0.635986 11.95L5.58599 6.99999L0.635986 2.04999L2.04999 0.635986L6.99999 5.58599Z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconSearch({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      width: size,
      height: size,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          d: "m11.02 10.078 2.856 2.855-.943.943-2.855-2.855A6.002 6.002 0 0 1 .333 6.334c0-3.313 2.688-6 6-6a6.002 6.002 0 0 1 4.688 9.744Zm-1.337-.495a4.665 4.665 0 0 0-3.35-7.917 4.665 4.665 0 0 0-4.666 4.667 4.665 4.665 0 0 0 7.916 3.35l.1-.1Z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconCode({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          fill: "currentColor",
          d: "M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
        }
      )
    }
  );
}
function IconFolder({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          fill: "currentColor",
          d: "M3 21a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2H20a1 1 0 0 1 1 1v3h-2V7h-7.414l-2-2H4v11.998L5.5 11h17l-2.31 9.243a1 1 0 0 1-.97.757H3zm16.938-8H7.062l-1.5 6h12.876l1.5-6z"
        }
      )
    }
  );
}
function IconBack({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          d: "M4.5 2.5L4.5 20.5L2.5 20.5L2.5 2.5L4.5 2.5ZM10.328 12.5L16.4 18.571L14.986 19.985L6.5 11.5L14.985 3.015L16.4 4.429L10.33 10.5L21.5 10.5L21.5 12.5L10.328 12.5Z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconSave({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      width: size,
      height: size,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          d: "M7 19v-6h10v6h2V7.828L16.172 5H5v14h2zM4 3h13l4 4v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm5 12v4h6v-4H9z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconCalendar({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          fill: "currentColor",
          d: "M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm-2 2H9v2H7V5H4v4h16V5h-3v2h-2V5zm5 6H4v8h16v-8z"
        }
      )
    }
  );
}
function IconPage({ size = 24 }) {
  return /* @__PURE__ */ jsx13(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx13(
        "path",
        {
          fill: "currentColor",
          d: "M5 8v12h14V8H5zm0-2h14V4H5v2zm15 16H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zM7 10h4v4H7v-4zm0 6h10v2H7v-2zm6-5h4v2h-4v-2z"
        }
      )
    }
  );
}
function IconBlocs({ size = 24 }) {
  return /* @__PURE__ */ jsxs7(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: [
        /* @__PURE__ */ jsx13(
          "path",
          {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M4 4v5h16V4H4ZM3 2a1 1 0 0 0-1 1v7c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1H3ZM4 15v5h16v-5H4Zm-1-2a1 1 0 0 0-1 1v7c0 .6.4 1 1 1h18c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1H3Z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx13("path", { fill: "currentColor", d: "M5 5h6v1H5V5ZM5 16h6v1H5v-1Z" })
      ]
    }
  );
}

// src/components/Sortable.tsx
import { jsx as jsx14, jsxs as jsxs8 } from "@emotion/react/jsx-runtime";
function SortableWrapper({
  items,
  children,
  onMove
}) {
  const ids = items.map((item) => item._id);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  function handleDragEnd(event) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onMove(ids.indexOf(active.id.toString()), ids.indexOf(over.id.toString()));
    }
  }
  return /* @__PURE__ */ jsx14(
    DndContext,
    {
      sensors,
      collisionDetection: closestCenter,
      onDragEnd: handleDragEnd,
      modifiers: [restrictToVerticalAxis, restrictToParentElement],
      children: /* @__PURE__ */ jsx14(SortableContext, { items: ids, strategy: verticalListSortingStrategy, children })
    }
  );
}
function Sortable({
  item,
  children,
  className,
  ...props
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item._id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition || void 0
  };
  return /* @__PURE__ */ jsxs8(
    "div",
    {
      className,
      "data-dragging": isDragging ? true : void 0,
      ref: setNodeRef,
      style,
      ...attributes,
      ...props,
      children: [
        /* @__PURE__ */ jsx14(DragHandle, { ...listeners }),
        children
      ]
    }
  );
}

// src/functions/array.ts
import { arrayMove } from "@dnd-kit/sortable";
function moveItem(items, from, to) {
  return arrayMove(items, from, to);
}
function insertItem(items, index, value) {
  const clone = [...items];
  clone.splice(index, 0, value);
  return clone;
}

// src/store.tsx
import { create, useStore as useZustandStore } from "zustand";

// src/functions/object.ts
function keys(ks) {
  return Array.isArray(ks) ? ks : ks.split(".");
}
function deepGet(o, kp, d = null) {
  return keys(kp).reduce(
    (o2, k) => o2 && (Array.isArray(o2) ? o2[parseInt(k)] : o2[k]) || d,
    o
  );
}
function deepSet(object, keyPath, value) {
  if (!keyPath) {
    return value;
  }
  return keys(keyPath).reduceRight((acc, key, i, keys2) => {
    const original = deepGet(object, keys2.slice(0, i));
    if (Array.isArray(original)) {
      return original.map((v, k) => {
        if (k.toString() === key) {
          return acc;
        }
        return v;
      });
    } else {
      return Object.assign({}, original, { [key]: acc });
    }
  }, value);
}
function stringifyFields(source) {
  return JSON.stringify(
    source,
    (key, value) => {
      if (key === "_id") {
        return void 0;
      }
      return value;
    },
    2
  );
}
function indexify(object) {
  if (Array.isArray(object)) {
    const prefix = Math.round(Date.now() / 1e3);
    object.forEach((v, k) => {
      if (typeof v === "object") {
        v._id = prefix + k.toString();
        indexify(v);
      }
    });
  } else if (typeof object === "object" && object !== null) {
    Object.keys(object).forEach((key) => indexify(object[key]));
  }
  return object;
}
function cast(value, expectedValue) {
  if (typeof expectedValue === "boolean") {
    return !!value;
  }
  if (typeof expectedValue === "string") {
    if (typeof value === "boolean") {
      return "";
    }
    return "" + (value ?? "");
  }
  throw new Error(`Cannot cast ${typeof value} into a ${typeof expectedValue}`);
}

// src/store.tsx
import { combine, devtools } from "zustand/middleware";

// src/functions/string.ts
function uniqId() {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}
function textContent(str) {
  return new DOMParser().parseFromString(str, "text/html").body.textContent;
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// src/functions/number.ts
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// src/store.tsx
import {
  useCallback as useCallback2,
  createContext as createContext2,
  useContext as useContext2,
  useMemo as useMemo2
} from "react";

// src/functions/fields.ts
function fillDefaults(data, fields) {
  let newData = { ...data };
  for (const field of fields) {
    if (field.group) {
      newData = fillDefaults(newData, field.fields);
      continue;
    }
    const name = field.name;
    if (data[name] === void 0 && "default" in field.options) {
      newData[name] = field.options.default;
    }
  }
  return newData;
}

// src/functions/i18n.ts
function t(key) {
  return VisualEditor.i18n[key];
}

// src/store.tsx
import { jsx as jsx15 } from "@emotion/react/jsx-runtime";
var PreviewModes = /* @__PURE__ */ ((PreviewModes2) => {
  PreviewModes2[PreviewModes2["PHONE"] = 0] = "PHONE";
  PreviewModes2[PreviewModes2["DESKTOP"] = 1] = "DESKTOP";
  return PreviewModes2;
})(PreviewModes || {});
var sidebarWidth = typeof localStorage !== "undefined" ? localStorage.getItem("veSidebarWidth") : 0;
var createStore = (data = [], definitions, hiddenCategories = [], rootElement, templates2, insertPosition) => create(
  devtools(
    combine(
      {
        data,
        definitions,
        hiddenCategories,
        rootElement,
        templates: templates2,
        insertPosition,
        previousData: [],
        rollbackMessage: null,
        addBlockIndex: null,
        focusIndex: null,
        previewMode: 1 /* DESKTOP */,
        sidebarWidth: clamp(
          sidebarWidth ? parseInt(sidebarWidth, 10) : 33,
          0,
          window.innerWidth - 375
        )
      },
      (set) => ({
        setSidebarWidth: function(width) {
          localStorage.setItem("veSidebarWidth", width.toString());
          set(() => ({
            sidebarWidth: width
          }));
        },
        updateData: function(newData, path) {
          return set((state) => ({
            data: deepSet(state.data, path, newData)
          }));
        },
        removeBloc: function(removedData) {
          return set(({ data: data2 }) => ({
            previousData: data2,
            data: data2.filter((d) => d !== removedData),
            rollbackMessage: t("deleteItemConfirm")
          }));
        },
        rollback: function() {
          return set(({ previousData }) => ({
            previousData: [],
            rollbackMessage: null,
            data: previousData
          }));
        },
        voidRollback: function() {
          return set(() => ({
            rollbackMessage: null,
            previousData: []
          }));
        },
        insertData: function(name, index, extraData) {
          const newData = {
            ...extraData,
            _name: name,
            _id: name + uniqId()
          };
          set((state) => {
            return {
              data: insertItem(state.data, index, newData),
              focusIndex: newData._id
            };
          });
          return newData;
        },
        setData: function(newData) {
          set(() => {
            return {
              data: indexify(newData),
              focusIndex: null
            };
          });
        },
        setFocusIndex: function(id) {
          set(() => ({ focusIndex: id }));
        },
        setAddBlockIndex: function(index) {
          if (index === void 0) {
            set((state) => ({
              addBlockIndex: state.insertPosition === "start" /* Start */ ? 0 : state.data.length
            }));
            return;
          }
          if (typeof index === "string") {
            set((state) => ({
              addBlockIndex: state.data.findIndex((v) => v._id === index)
            }));
            return;
          }
          set(() => ({ addBlockIndex: index }));
        },
        togglePreviewMode: function() {
          set(({ previewMode }) => ({
            previewMode: previewMode === 1 /* DESKTOP */ ? 0 /* PHONE */ : 1 /* DESKTOP */
          }));
        }
      })
    )
  )
);
var StoreContext = createContext2({});
function StoreProvider({
  children,
  data,
  definitions,
  hiddenCategories,
  rootElement,
  templates: templates2,
  insertPosition
}) {
  const store2 = useMemo2(
    () => createStore(
      data,
      definitions,
      hiddenCategories,
      rootElement,
      templates2,
      insertPosition
    ),
    [
      data,
      definitions,
      hiddenCategories,
      rootElement,
      templates2,
      insertPosition
    ]
  );
  return /* @__PURE__ */ jsx15(StoreContext.Provider, { value: { store: store2 }, children });
}
function useStore(selector) {
  const store2 = useContext2(StoreContext).store;
  if (!store2) {
    throw new Error("A context need to be provided to use the store");
  }
  return useZustandStore(store2, selector);
}
function useData() {
  return useStore((state) => state.data);
}
function useRootElement() {
  return useStore((state) => state.rootElement);
}
function useUpdateData() {
  return useStore((state) => state.updateData);
}
function useRemoveBloc() {
  return useStore((state) => state.removeBloc);
}
function useInsertData() {
  return useStore((state) => state.insertData);
}
function useSetData() {
  return useStore((state) => state.setData);
}
function useFocusIndex() {
  return useStore((state) => state.focusIndex);
}
function useDefinitions() {
  return useStore((state) => state.definitions);
}
function useSetFocusIndex() {
  return useStore((state) => state.setFocusIndex);
}
function useFieldFocused(id) {
  return useStore((state) => state.focusIndex === id);
}
function usePreviewMode() {
  return useStore((state) => state.previewMode);
}
function useTogglePreviewMode() {
  return useStore((state) => state.togglePreviewMode);
}
function useSidebarWidth() {
  return useStore((state) => state.sidebarWidth);
}
function useSetSidebarWidth() {
  return useStore((state) => state.setSidebarWidth);
}
function useFieldDefinitions() {
  return useStore((state) => state.definitions);
}
function useHiddenCategories() {
  return useStore((state) => state.hiddenCategories);
}
function useBlocSelectionVisible() {
  return useStore((state) => state.addBlockIndex) !== null;
}
function useSetBlockIndex() {
  return useStore((state) => state.setAddBlockIndex);
}
function useTemplates() {
  return useStore((state) => state.templates);
}
function useAddBlock() {
  const insertData = useInsertData();
  const blockIndex = useStore((state) => state.addBlockIndex) || 0;
  const definitions = useDefinitions();
  const setBlockIndex = useSetBlockIndex();
  return useCallback2(
    (blocName) => {
      insertData(
        blocName,
        blockIndex,
        fillDefaults({}, definitions[blocName].fields)
      );
      setBlockIndex(null);
    },
    [insertData, blockIndex, definitions, setBlockIndex]
  );
}
function useRollbackMessage() {
  const message = useStore((state) => state.rollbackMessage);
  const rollback = useStore((state) => state.rollback);
  const voidRollback = useStore((state) => state.voidRollback);
  return { message, rollback, voidRollback };
}
var store = useStore;

// src/components/Sidebar/SidebarBloc.tsx
import { memo, useMemo as useMemo3, useRef as useRef5 } from "react";

// src/hooks/useToggle.ts
import { useState as useState3 } from "react";
function useToggle(initial = false) {
  const [state, setState] = useState3(initial);
  return [state, () => setState((s) => !s), setState];
}

// src/hooks/useUpdateEffect.ts
import { useEffect as useEffect3, useRef as useRef3 } from "react";
function useUpdateEffect(cb, deps) {
  const isFirstRender = useRef3(true);
  useEffect3(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return cb();
  }, deps);
}

// src/functions/dom.ts
function strToDom(str) {
  return document.createRange().createContextualFragment(`<div>${str.trim()}</div>`).firstChild;
}
function offsetTop(element, acc = 0) {
  if (element.offsetParent) {
    return offsetTop(
      element.offsetParent,
      acc + element.offsetTop
    );
  }
  return acc + element.offsetTop;
}

// src/components/Sidebar/SidebarHeading.tsx
import { forwardRef as forwardRef2 } from "react";
import styled15 from "@emotion/styled";
import { jsx as jsx16, jsxs as jsxs9 } from "@emotion/react/jsx-runtime";
var Wrapper4 = styled15(Flex)({});
var Title2 = styled15.div({
  width: "100%",
  color: "var(--ve-color-light)",
  textAlign: "left",
  fontSize: ".95em",
  scrollMargin: "1.8em",
  cursor: "pointer",
  strong: {
    display: "block",
    color: "var(--ve-color)",
    fontWeight: 500,
    fontSize: "1.1em"
  }
});
var HoverableActions = styled15(Flex)({
  opacity: 0,
  transition: "opacity .3s",
  [`*:hover > * > &`]: {
    opacity: 1
  }
});
var SidebarHeading = forwardRef2(
  ({ children, onClick, title, description }, ref) => {
    const as = onClick ? UnstyledButton : "div";
    return /* @__PURE__ */ jsxs9(Wrapper4, { ref, gap: 0, between: true, children: [
      /* @__PURE__ */ jsxs9(Title2, { as, onClick, children: [
        /* @__PURE__ */ jsx16("strong", { children: title }),
        description
      ] }),
      children
    ] });
  }
);
SidebarHeading.displayName = "SidebarHeading";
var SidebarHeadingHoverable = (props) => {
  return /* @__PURE__ */ jsx16(HoverableActions, { gap: 0, ...props });
};
SidebarHeading.Hover = SidebarHeadingHoverable;

// src/components/Sidebar/SidebarBlocWrapper.tsx
import styled16 from "@emotion/styled";
var SidebarBlocWrapper = styled16(Sortable, {
  target: "SidebarBlocWrapper"
})({
  position: "relative",
  padding: ".8em .6em .8em 1.4em",
  backgroundColor: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
  transition: "box-shadow .3s",
  cursor: "inherit",
  // Avoir problems with reset that set pointer on [role=button]
  "&[data-dragging]": {
    boxShadow: "var(--ve-shadow-dragging)",
    transition: "box-shadow .3s!important",
    zIndex: 10
  }
});

// src/components/Sidebar/SidebarBlocMissing.tsx
import { jsx as jsx17 } from "@emotion/react/jsx-runtime";
function SidebarBlocMissing({ data }) {
  const removeBloc = useRemoveBloc();
  return /* @__PURE__ */ jsx17(
    SidebarBlocWrapper,
    {
      item: data,
      css: {
        backgroundColor: "var(--ve-hover)",
        boxShadow: "none"
      },
      children: /* @__PURE__ */ jsx17(SidebarHeading, { title: `${t("unknownComponent")} : ${data._name}`, children: /* @__PURE__ */ jsx17(
        ButtonIcon,
        {
          danger: true,
          onClick: prevent(() => removeBloc(data)),
          title: t("deleteComponent"),
          children: /* @__PURE__ */ jsx17(IconTrash, { size: 20 })
        }
      ) })
    }
  );
}

// src/components/Sidebar/FieldsRenderer.tsx
import { useCallback as useCallback3 } from "react";
import { Fragment as Fragment3, jsx as jsx18 } from "@emotion/react/jsx-runtime";
function FieldsRenderer({
  data,
  fields,
  path,
  onUpdate
}) {
  return /* @__PURE__ */ jsx18(Fragment3, { children: fields.filter((field) => field.shouldRender(data)).map(
    (field, k) => field.group ? /* @__PURE__ */ jsx18(field.render, { options: field.options, children: /* @__PURE__ */ jsx18(
      FieldsRenderer,
      {
        fields: field.fields,
        data,
        path,
        onUpdate
      }
    ) }, k) : /* @__PURE__ */ jsx18(
      Field2,
      {
        field,
        value: field.name ? data[field.name] : void 0,
        path: `${path}.${field.name}`,
        extraProps: field.extraProps ? field.extraProps(data) : void 0,
        onUpdate
      },
      field.name
    )
  ) });
}
function Field2({
  field,
  value,
  path,
  extraProps,
  onUpdate
}) {
  const Component14 = field.render;
  const handleChange = useCallback3(
    (v) => {
      onUpdate(v, path);
    },
    [path, onUpdate]
  );
  return /* @__PURE__ */ jsx18(
    Component14,
    {
      value,
      onChange: handleChange,
      options: field.options,
      ...extraProps
    }
  );
}

// src/components/Sidebar/SidebarFields.tsx
import { jsx as jsx19 } from "@emotion/react/jsx-runtime";
function SidebarFields({ fields, data, path }) {
  const updateData = useUpdateData();
  return /* @__PURE__ */ jsx19(
    FieldsRenderer,
    {
      fields,
      data,
      onUpdate: updateData,
      path
    }
  );
}

// src/functions/browser.ts
async function copyToClipboard(text) {
  try {
    const permissionName = "clipboard-write";
    const result = await navigator.permissions.query({
      name: permissionName
    });
    if (result.state == "granted" || result.state == "prompt") {
      await navigator.clipboard.writeText(text);
      return true;
    }
    throw result;
  } catch (e) {
    await navigator.clipboard.writeText(text);
    return true;
  }
}
function isClientSide() {
  return !!(typeof window !== "undefined" && window.document);
}

// src/components/Sidebar/Actions/CopyAction.tsx
import { useEffect as useEffect4, useRef as useRef4, useState as useState4 } from "react";
import { Fragment as Fragment4, jsx as jsx20, jsxs as jsxs10 } from "@emotion/react/jsx-runtime";
function CopyAction({ data, size, ...props }) {
  const [success, setSuccess] = useState4(false);
  const timer = useRef4();
  const handleCopy = async () => {
    try {
      await copyToClipboard(stringifyFields(data));
      setSuccess(true);
      timer.current = window.setTimeout(() => {
        setSuccess(false);
      }, 4e3);
    } catch (e) {
      alert(e);
    }
  };
  const tooltipLabel = Array.isArray(data) ? t("copyPage") : t("copyComponent");
  useEffect4(() => {
    clearTimeout(timer.current);
  }, []);
  return /* @__PURE__ */ jsx20(
    Tooltip,
    {
      content: success ? /* @__PURE__ */ jsxs10(Fragment4, { children: [
        t("copySuccess"),
        /* @__PURE__ */ jsx20("br", {}),
        t("copyInstructions")
      ] }) : tooltipLabel,
      trigger: "focus",
      children: /* @__PURE__ */ jsx20("div", { children: /* @__PURE__ */ jsx20(ButtonIcon, { onClick: prevent(handleCopy), success, ...props, children: success ? /* @__PURE__ */ jsx20(IconCheck, { size }) : /* @__PURE__ */ jsx20(IconCode, { size }) }) })
    }
  );
}

// src/components/Sidebar/SidebarBloc.tsx
import { jsx as jsx21, jsxs as jsxs11 } from "@emotion/react/jsx-runtime";
var SidebarBloc = memo(function SidebarItem({
  data,
  definition,
  path
}) {
  const ref = useRef5(null);
  const isFocused = useFieldFocused(data._id);
  const [isCollapsed, toggleCollapsed, setCollapsed] = useToggle(!isFocused);
  const removeBloc = useRemoveBloc();
  const setFocusIndex = useSetFocusIndex();
  const label = definition?.label && data[definition.label] ? data[definition.label] : null;
  useUpdateEffect(() => {
    if (isFocused) {
      setCollapsed(false);
      window.setTimeout(
        () => ref.current.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    } else {
      setCollapsed(true);
    }
  }, [isFocused]);
  const labelHTMLSafe = useMemo3(
    () => label?.includes("<") ? strToDom(label).innerText : label,
    [label]
  );
  const handleRemove = () => {
    removeBloc(data);
  };
  const focusBloc = () => {
    if (isCollapsed) {
      setFocusIndex(path);
    }
    toggleCollapsed();
  };
  if (!definition) {
    return /* @__PURE__ */ jsx21(SidebarBlocMissing, { data });
  }
  return /* @__PURE__ */ jsxs11(SidebarBlocWrapper, { item: data, children: [
    /* @__PURE__ */ jsxs11(
      SidebarHeading,
      {
        ref,
        title: definition.title,
        description: isCollapsed ? labelHTMLSafe : null,
        onClick: prevent(focusBloc),
        children: [
          /* @__PURE__ */ jsxs11(SidebarHeading.Hover, { children: [
            /* @__PURE__ */ jsx21(CopyAction, { data, size: 20 }),
            /* @__PURE__ */ jsx21(
              ButtonIcon,
              {
                danger: true,
                onClick: handleRemove,
                title: t("deleteComponent"),
                children: /* @__PURE__ */ jsx21(IconTrash, { size: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ jsx21(
            ButtonIcon,
            {
              rotate: isCollapsed ? -90 : 0,
              onClick: prevent(toggleCollapsed),
              children: /* @__PURE__ */ jsx21(IconDown, { size: 20 })
            }
          )
        ]
      }
    ),
    !isCollapsed && /* @__PURE__ */ jsx21(Flex, { column: true, gap: 1, css: { marginTop: ".5em" }, children: /* @__PURE__ */ jsx21(SidebarFields, { fields: definition.fields, data, path }) })
  ] });
});

// src/components/Sidebar/SidebarBlocs.tsx
import styled17 from "@emotion/styled";
import { jsx as jsx22 } from "@emotion/react/jsx-runtime";
function SidebarBlocs({ data }) {
  const updateData = useUpdateData();
  const definitions = useFieldDefinitions();
  const handleMove = (from, to) => {
    updateData(moveItem(data, from, to));
  };
  return /* @__PURE__ */ jsx22(Wrapper5, { children: /* @__PURE__ */ jsx22(SortableWrapper, { items: data, onMove: handleMove, children: data.map((v, k) => /* @__PURE__ */ jsx22(
    SidebarBloc,
    {
      data: v,
      definition: definitions[v._name],
      path: `${k}`
    },
    v._id
  )) }) });
}
var Wrapper5 = styled17.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  flexDirection: "column",
  gridGap: "1em",
  padding: "1em",
  overflow: "auto",
  scrollbarGutter: "stable"
});

// src/components/Sidebar/SidebarHeader.tsx
import styled18 from "@emotion/styled";
import { jsx as jsx23, jsxs as jsxs12 } from "@emotion/react/jsx-runtime";
function SidebarHeader({ onClose, children }) {
  const togglePreviewMode = useTogglePreviewMode();
  const previewMode = usePreviewMode();
  const isPhone = previewMode === 0 /* PHONE */;
  const setAddBlock = useSetBlockIndex();
  const data = useData();
  return /* @__PURE__ */ jsxs12(Wrapper6, { between: true, children: [
    /* @__PURE__ */ jsx23("div", { children: /* @__PURE__ */ jsx23(ButtonIcon, { title: t("close"), onClick: prevent(onClose), children: /* @__PURE__ */ jsx23(IconCross, { size: 12 }) }) }),
    /* @__PURE__ */ jsxs12(Flex, { children: [
      children,
      /* @__PURE__ */ jsx23(CopyAction, { data, size: 20 }),
      /* @__PURE__ */ jsx23(
        ButtonIcon,
        {
          onClick: prevent(togglePreviewMode),
          title: t("responsiveView"),
          children: isPhone ? /* @__PURE__ */ jsx23(IconDesktop, { size: 20 }) : /* @__PURE__ */ jsx23(IconPhone, { size: 24 })
        }
      ),
      /* @__PURE__ */ jsx23(Button, { icon: IconCirclePlus, onClick: prevent(() => setAddBlock()), children: t("addComponent") })
    ] })
  ] });
}
var Wrapper6 = styled18(Flex)({
  padding: "0 1em",
  flex: "none",
  backgroundColor: "#FFF",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "rgba(0, 0, 0, 0.05) 0 1px 2px 0",
  height: 64
});

// src/components/Sidebar/Sidebar.tsx
import styled22 from "@emotion/styled";
import { keyframes as keyframes4 } from "@emotion/react";

// src/components/Sidebar/SidebarFooter.tsx
import styled19 from "@emotion/styled";
import { jsx as jsx24, jsxs as jsxs13 } from "@emotion/react/jsx-runtime";
function SidebarFooter() {
  return /* @__PURE__ */ jsxs13(Wrapper7, { between: true, children: [
    /* @__PURE__ */ jsxs13(Mention, { children: [
      t("poweredBy"),
      " ",
      /* @__PURE__ */ jsx24("br", {}),
      /* @__PURE__ */ jsx24("a", { href: "https://boxraiser.com", target: "_blank", children: /* @__PURE__ */ jsx24(
        Logo,
        {
          src: "https://static.boxraiser.com/logo.svg",
          alt: "Logo Boxraiser"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx24(Button, { type: "submit", icon: IconSave, children: t("save") })
  ] });
}
var Wrapper7 = styled19(Flex)({
  marginTop: "auto",
  backgroundColor: "#FFF",
  justifyContent: "flex-end",
  borderTop: "1px solid rgba(0,0,0,0.06)",
  padding: ".5em 1em",
  boxShadow: "0 -1px 2px 0 rgba(0,0,0,0.05)"
});
var Mention = styled19("div")({
  fontSize: ".7em",
  marginRight: "auto"
});
var Logo = styled19("img")({
  width: "auto",
  height: 20
});

// src/components/Sidebar/SidebarEmpty.tsx
import styled20 from "@emotion/styled";
import { jsx as jsx25, jsxs as jsxs14 } from "@emotion/react/jsx-runtime";
function SidebarEmpty(data) {
  return /* @__PURE__ */ jsxs14(Wrapper8, { children: [
    /* @__PURE__ */ jsx25(Description, { children: t("noContent") }),
    /* @__PURE__ */ jsx25("div", { children: /* @__PURE__ */ jsx25(Button, { outline: true, onClick: prevent(data.onAction), size: "small", children: t("useTemplate") }) })
  ] });
}
var Wrapper8 = styled20.div({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  textAlign: "center"
});
var Description = styled20.p({
  marginBottom: "1em"
});

// src/components/Sidebar/Sidebar.tsx
import { useCallback as useCallback5, useState as useState6 } from "react";

// src/components/Sidebar/SidebarTemplates.tsx
import styled21 from "@emotion/styled";
import { useCallback as useCallback4, useState as useState5 } from "react";
import { jsx as jsx26, jsxs as jsxs15 } from "@emotion/react/jsx-runtime";
function SidebarTemplates({ onTemplate }) {
  const templates2 = useTemplates();
  const setData = useSetData();
  const [loadingTemplate, setLoadingTemplate] = useState5();
  const callback = useCallback4(
    async (t2) => {
      setLoadingTemplate(t2);
      let data;
      if (typeof t2.data === "function") {
        setLoadingTemplate(t2);
        data = await t2.data().catch(() => []);
        setLoadingTemplate(t2);
      } else {
        data = t2.data;
      }
      setData(data);
      onTemplate();
    },
    [setData, onTemplate]
  );
  return /* @__PURE__ */ jsx26(Wrapper9, { children: templates2.map((t2) => /* @__PURE__ */ jsx26(
    TemplateCard,
    {
      template: t2,
      onClick: callback,
      loading: loadingTemplate === t2
    }
  )) });
}
function TemplateCard({
  template,
  onClick,
  loading
}) {
  return /* @__PURE__ */ jsxs15(
    StyledCard,
    {
      hoverable: true,
      onClick: prevent(() => loading ? null : onClick(template)),
      loading,
      children: [
        loading && /* @__PURE__ */ jsx26(Spinner, {}),
        /* @__PURE__ */ jsx26(TemplateImage, { src: template.image, alt: "" }),
        /* @__PURE__ */ jsxs15(Body, { children: [
          /* @__PURE__ */ jsx26(Title3, { children: template.name }),
          /* @__PURE__ */ jsx26("div", { children: template.description })
        ] })
      ]
    }
  );
}
var Wrapper9 = styled21.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  height: "100%",
  padding: "1em",
  gap: "1em",
  overflow: "auto"
});
var StyledCard = styled21(Card)(
  {
    padding: 0,
    display: "grid",
    position: "relative",
    gridTemplateColumns: "150px 1fr",
    gridGap: "1.5em",
    alignItems: "center",
    width: "100%",
    cursor: "pointer"
  },
  (props) => props.loading ? {
    opacity: 0.4,
    cursor: "inherit"
  } : {}
);
var TemplateImage = styled21.img({
  width: "100%",
  height: "150px",
  objectFit: "cover"
});
var Body = styled21.div({
  display: "grid",
  gridTemplateColumns: "1fr"
});
var Title3 = styled21.div({
  color: "var(--ve-color)",
  fontWeight: 500,
  fontSize: "1.1em"
});

// src/components/Sidebar/Sidebar.tsx
import { jsx as jsx27, jsxs as jsxs16 } from "@emotion/react/jsx-runtime";
function Sidebar({
  data,
  onClose,
  ...props
}) {
  const [state, setState] = useState6(0 /* BLOCS */);
  const templates2 = useTemplates();
  const toggleMode = useCallback5(() => {
    setState((v) => v === 0 /* BLOCS */ ? 1 /* TEMPLATES */ : 0 /* BLOCS */);
  }, []);
  const hasTemplates = templates2.length > 0;
  const showEmpty = data.length === 0 && hasTemplates;
  const isTemplateMode = state === 1 /* TEMPLATES */;
  return /* @__PURE__ */ jsxs16(SidebarWrapper, { ...props, children: [
    /* @__PURE__ */ jsx27(SidebarHeader, { onClose, children: hasTemplates && /* @__PURE__ */ jsx27(
      ButtonIcon,
      {
        onClick: prevent(toggleMode),
        title: t(isTemplateMode ? "addComponent" : "useTemplate"),
        children: isTemplateMode ? /* @__PURE__ */ jsx27(IconBlocs, {}) : /* @__PURE__ */ jsx27(IconPage, {})
      }
    ) }),
    state === 0 /* BLOCS */ && (showEmpty ? /* @__PURE__ */ jsx27(SidebarEmpty, { onAction: () => setState(1 /* TEMPLATES */) }) : /* @__PURE__ */ jsx27(SidebarBlocs, { data })),
    state === 1 /* TEMPLATES */ && /* @__PURE__ */ jsx27(SidebarTemplates, { onTemplate: () => setState(0 /* BLOCS */) }),
    /* @__PURE__ */ jsx27(SidebarFooter, {})
  ] });
}
var Out = keyframes4({
  from: { transform: "translateX(0)" },
  to: { transform: "translateX(-100%)" }
});
var In = keyframes4({
  from: { transform: "translateX(-100%)" },
  to: { transform: "translateX(0)" }
});
var SidebarWrapper = styled22.div({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "#FBFBFD",
  zIndex: 2,
  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2),0 10px 10px -5px rgba(0,0,0,0.04)",
  transition: "transform .5s cubic-bezier(0.19, 1, 0.22, 1)",
  animation: `${In} .7s cubic-bezier(0.19, 1, 0.22, 1) both`,
  "[hidden=hidden] &": {
    animation: `${Out} .7s cubic-bezier(0.19, 1, 0.22, 1) both`
  }
});

// src/components/Preview/Preview.tsx
import { useRef as useRef9, useState as useState9 } from "react";
import { createPortal } from "react-dom";

// src/hooks/useAsyncEffect.ts
import { useEffect as useEffect5 } from "react";
function useAsyncEffect(cb, deps) {
  useEffect5(() => {
    cb();
  }, deps);
}

// src/components/Preview/Preview.tsx
import { useWindowSize } from "react-use";

// src/constants.ts
var PHONE_HEIGHT = 844;

// src/components/Preview/FrameProvider.tsx
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import weakMemoize from "@emotion/weak-memoize";
import { jsx as jsx28 } from "@emotion/react/jsx-runtime";
var memoizedCreateCacheWithContainer = weakMemoize((container) => {
  return createCache({
    container: container.querySelector("head"),
    key: "iframe"
  });
});
function FrameProvider({ container, children }) {
  return /* @__PURE__ */ jsx28(CacheProvider, { value: memoizedCreateCacheWithContainer(container), children });
}

// src/components/BaseStyles.tsx
import styled23 from "@emotion/styled";
import { css as css2, Global } from "@emotion/react";
import { Fragment as Fragment5, jsx as jsx29, jsxs as jsxs17 } from "@emotion/react/jsx-runtime";
var BaseStyles = ({ children, complete = true }) => {
  return /* @__PURE__ */ jsxs17(Fragment5, { children: [
    /* @__PURE__ */ jsx29(Global, { styles: { "visual-editor": { display: "block" } } }),
    /* @__PURE__ */ jsx29(Reset, { complete, children })
  ] });
};
var Reset = styled23.div(
  css2`
    --ve-background: #fff;
    --ve-primary: #1771e6;
    --ve-dark: #202227;
    --ve-primary-hover: #388afa;
    --ve-primary-light: #1771e626;
    --ve-color: #111827;
    --ve-hover: #f3f4f9;
    --ve-color-light: #6b7280;
    --ve-field-border: rgb(209, 213, 219);
    --ve-field-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    --ve-blocs-background: rgba(0, 0, 0, 0.05);
    --ve-danger: #ae2121;
    --ve-danger-light: rgba(255, 0, 0, 0.05);
    --ve-shadow-dragging: rgba(0, 0, 0, 0.1) 0 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
    --ve-gap: 0.5em;
    font-size: 16px;
    line-height: 1.4;

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
  `,
  (props) => props.complete ? `
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }` : {}
);

// src/components/Preview/Preview.tsx
import styled27 from "@emotion/styled";
import { keyframes as keyframes5 } from "@emotion/react";

// src/components/Preview/PreviewItems.tsx
import { Flipper } from "react-flip-toolkit";

// src/components/Preview/PreviewAddFloating.tsx
import styled24 from "@emotion/styled";
import { jsx as jsx30 } from "@emotion/react/jsx-runtime";
function PreviewAddFloating({ onClick, style }) {
  return /* @__PURE__ */ jsx30(Button2, { onClick, style, children: /* @__PURE__ */ jsx30("span", { children: "Ajouter un bloc" }) });
}
var Button2 = styled24(UnstyledButton)({
  position: "relative",
  marginTop: "-40px",
  marginBottom: "-40px",
  opacity: 0,
  width: "100%",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 101,
  backgroundColor: "transparent",
  border: "none",
  transition: "opacity .3s",
  "&:hover": { opacity: 1 },
  "&::before": {
    content: "''",
    height: "2px",
    width: "100%",
    position: "absolute",
    top: "calc(50% - 1px)",
    left: "0",
    zIndex: 101,
    backgroundColor: "var(--ve-primary)"
  },
  "&::after": {
    content: "'+'",
    fontSize: "1.5em",
    zIndex: 101,
    width: "40px",
    height: "40px",
    background: "var(--ve-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
    borderRadius: "40px",
    transition: "transform .3s"
  },
  "& span": {
    pointerEvents: "none",
    fontSize: "15px",
    height: "34px",
    background: "var(--ve-primary)",
    padding: "0 .5em",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    left: "50%",
    bottom: "-30px",
    transform: "translate(-50%, 5px)",
    color: "#FFF",
    transition: "transform .3s",
    "&::before": {
      content: "''",
      position: "absolute",
      display: "block",
      left: "calc(50% - 6px)",
      top: "-6px",
      width: "12px",
      height: "12px",
      background: "var(--bs-primary)",
      transform: "rotate(45deg)"
    }
  },
  "&:hover span": { transform: "translate(-50%, 0px)" }
});

// src/components/Preview/PreviewItem.tsx
import { useEffect as useEffect7, useRef as useRef8 } from "react";

// src/hooks/usePreview.ts
import { useRef as useRef7, useState as useState8 } from "react";

// src/hooks/useEffectDebounced.ts
import { useEffect as useEffect6, useMemo as useMemo4, useRef as useRef6 } from "react";

// src/functions/time.ts
function debounce(func, wait) {
  let timeout = null;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(later, wait);
  };
}

// src/hooks/useEffectDebounced.ts
function useEffectDebounced(callback, deps, time) {
  const callbackRef = useRef6(callback);
  const debouncedCallback = useMemo4(() => {
    return debounce((...args) => callbackRef.current(...args), time);
  }, []);
  callbackRef.current = callback;
  useEffect6(() => {
    debouncedCallback();
  }, deps);
}

// src/hooks/usePreview.ts
function usePreview(data, previewUrl, initialHTML) {
  const [loading, setLoading] = useState8(false);
  const [html, setHTML] = useState8(initialHTML);
  const isFirstRender = useRef7(!!initialHTML);
  useEffectDebounced(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      const timer = window.setTimeout(() => setLoading(true), 200);
      fetch(previewUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ ...data, preview: true })
      }).then((r) => r.text()).then(setHTML).finally(() => {
        clearTimeout(timer);
        setLoading(false);
      });
      return () => clearTimeout(timer);
    },
    [data],
    500
  );
  return {
    loading,
    html
  };
}

// src/components/Preview/PreviewItem.tsx
import { Flipped as Flipped2 } from "react-flip-toolkit";
import styled25 from "@emotion/styled";
import { jsx as jsx31, jsxs as jsxs18 } from "@emotion/react/jsx-runtime";
function PreviewItem({
  data,
  initialHTML,
  previewUrl,
  title
}) {
  const ref = useRef8(null);
  const { loading, html } = usePreview(data, previewUrl, initialHTML);
  const setFocusIndex = useSetFocusIndex();
  const isFocused = useFieldFocused(data._id);
  useEffect7(() => {
    if (isFocused) {
      const top = offsetTop(ref.current) - 40;
      const root = ref.current.closest("html");
      root.scrollTop = top;
    }
  }, [isFocused]);
  return /* @__PURE__ */ jsx31(Flipped2, { flipId: data._id, children: /* @__PURE__ */ jsxs18(
    PreviewItemWrapper,
    {
      id: `previewItem${data._id}`,
      isFocused,
      ref,
      onClick: () => setFocusIndex(data._id),
      children: [
        loading && /* @__PURE__ */ jsx31(StyledSpinner, { size: 12 }),
        /* @__PURE__ */ jsx31(PreviewItemTitle, { isFocused, children: title }),
        /* @__PURE__ */ jsx31("div", { dangerouslySetInnerHTML: { __html: html } })
      ]
    }
  ) });
}
var PreviewItemWrapper = styled25.div(
  {
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      borderColor: "var(--ve-primary)"
    },
    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      borderStyle: "solid",
      borderColor: "transparent",
      zIndex: 10
    },
    "&:hover::before": {
      borderColor: "var(--ve-primary)"
    }
  },
  ({ isFocused }) => ({
    "&::before": {
      borderWidth: isFocused ? 2 : 1,
      borderColor: isFocused ? "var(--ve-primary)" : "transparent"
    }
  })
);
var PreviewItemTitle = styled25.div(
  {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "var(--ve-primary)",
    color: "#FFF",
    padding: ".2rem .4rem",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    opacity: 0,
    transform: "translateY(calc(1px - 100%))",
    "*:hover > &": {
      opacity: 1
    }
  },
  ({ isFocused }) => ({
    opacity: isFocused ? 1 : 0
  })
);
var StyledSpinner = styled25(Spinner)({
  top: "1rem",
  right: "1rem",
  left: "auto",
  bottom: "auto",
  color: "var(--ve-primary)"
});

// src/components/Preview/PreviewAddButton.tsx
import styled26 from "@emotion/styled";
import { jsx as jsx32 } from "@emotion/react/jsx-runtime";
function PreviewAddButton({ onClick }) {
  return /* @__PURE__ */ jsx32(Wrapper10, { children: /* @__PURE__ */ jsx32(
    Button,
    {
      icon: IconCirclePlus,
      onClick,
      children: "Ajouter un bloc"
    }
  ) });
}
var Wrapper10 = styled26.div({
  backgroundColor: "transparent",
  border: "2px dashed var(--ve-field-border)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  color: "var(--ve-color)",
  width: "calc(100% - 2rem)",
  margin: "1rem",
  padding: "1rem"
});

// src/components/Preview/PreviewItems.tsx
import { Fragment as Fragment6, jsx as jsx33, jsxs as jsxs19 } from "@emotion/react/jsx-runtime";
function PreviewItems({
  data,
  initialHTML = {},
  previewUrl
}) {
  const setAddBlockIndex = useSetBlockIndex();
  const definitions = useFieldDefinitions();
  return /* @__PURE__ */ jsxs19(Fragment6, { children: [
    /* @__PURE__ */ jsx33(Flipper, { flipKey: data.map((d) => d._id).join("_"), children: data.map((v, k) => /* @__PURE__ */ jsxs19("div", { children: [
      /* @__PURE__ */ jsx33(PreviewAddFloating, { onClick: prevent(() => setAddBlockIndex(k)) }),
      /* @__PURE__ */ jsx33(
        PreviewItem,
        {
          title: definitions[v._name]?.title || "",
          data: v,
          initialHTML: initialHTML[v._id] || "",
          previewUrl
        }
      )
    ] }, v._id)) }),
    /* @__PURE__ */ jsx33(PreviewAddButton, { onClick: () => setAddBlockIndex(data.length) })
  ] });
}

// src/components/Preview/Preview.tsx
import { jsx as jsx34, jsxs as jsxs20 } from "@emotion/react/jsx-runtime";
function Preview({ data, previewUrl }) {
  const iframe = useRef9(null);
  const [iframeRoot, setIframeRoot] = useState9(null);
  const initialHTML = useRef9({});
  const [loaded, setLoaded] = useState9(false);
  const showSpinner = !loaded;
  useAsyncEffect(async () => {
    const r = await fetch(previewUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });
    if (!r.ok) {
      return;
    }
    const iframeDocument = iframe.current.contentDocument;
    iframeDocument.open();
    iframeDocument.write(await r.text());
    iframeDocument.close();
    const root = iframeDocument.querySelector("#ve-components");
    initialHTML.current = Array.from(root.children).reduce(
      (acc, v, k) => ({ ...acc, [data[k]._id]: v.outerHTML }),
      {}
    );
    root.innerHTML = "";
    setIframeRoot(root);
  }, []);
  const previewMode = usePreviewMode();
  const { height: windowHeight } = useWindowSize();
  let transform = void 0;
  if (previewMode === 0 /* PHONE */ && windowHeight < 844) {
    transform = { transform: `scale(${windowHeight / PHONE_HEIGHT})` };
  }
  return /* @__PURE__ */ jsxs20(PreviewWrapper, { children: [
    showSpinner && /* @__PURE__ */ jsx34(Spinner, { css: { color: "white", opacity: 0.6 } }),
    /* @__PURE__ */ jsx34(
      StyledIframe,
      {
        loaded,
        mobile: previewMode === 0 /* PHONE */,
        ref: iframe,
        style: transform,
        onLoad: () => setLoaded(true)
      }
    ),
    iframeRoot && createPortal(
      /* @__PURE__ */ jsx34(FrameProvider, { container: iframe.current.contentDocument, children: /* @__PURE__ */ jsx34(BaseStyles, { complete: false, children: /* @__PURE__ */ jsx34(
        PreviewItems,
        {
          data,
          initialHTML: initialHTML.current,
          previewUrl
        }
      ) }) }),
      iframeRoot
    )
  ] });
}
var Out2 = keyframes5({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(50px)", opacity: 0 }
});
var In2 = keyframes5({
  from: { transform: "translateX(50px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 }
});
var PreviewWrapper = styled27.div({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  animation: `${In2} .7s cubic-bezier(0.19, 1, 0.22, 1) both`,
  '[hidden="hidden"] &': {
    animationName: `${Out2}`
  }
});
var StyledIframe = styled27.iframe(
  {
    transformOrigin: "50% 50%",
    border: "none",
    color: "var(--ve-primary)",
    transition: "width .3s, height .3s, opacity .5s"
  },
  (props) => ({
    opacity: props.loaded ? 1 : 0,
    width: props.mobile ? "390px" : "100%",
    height: props.mobile ? "844px" : "100%"
  })
);

// src/components/ResizeBar.tsx
import { useState as useState10 } from "react";
import styled28 from "@emotion/styled";
import { Fragment as Fragment7, jsx as jsx35, jsxs as jsxs21 } from "@emotion/react/jsx-runtime";
function ResizeBar() {
  const [drag, setDrag] = useState10(false);
  const setSidebarWidth = useSetSidebarWidth();
  const handleMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDrag(true);
    const listener = (e2) => {
      setSidebarWidth(Math.round(100 * e2.clientX / window.innerWidth));
    };
    document.documentElement.addEventListener("mousemove", listener);
    document.documentElement.addEventListener(
      "mouseup",
      () => {
        setDrag(false);
        document.documentElement.removeEventListener("mousemove", listener);
      },
      { once: true }
    );
  };
  return /* @__PURE__ */ jsxs21(Fragment7, { children: [
    /* @__PURE__ */ jsx35(Wrapper11, { isDragging: drag, onMouseDown: handleMouseDown }),
    drag && /* @__PURE__ */ jsx35(ResizeBarOverlay, {})
  ] });
}
var Wrapper11 = styled28.div(
  {
    position: "fixed",
    top: 0,
    bottom: 0,
    height: "100%",
    left: "var(--ve-clampedSidebar)",
    width: 15,
    zIndex: 1002,
    cursor: "ew-resize",
    transition: "box-shadow .3s",
    ":hover": {
      boxShadow: "-1px -1px 0 1px var(--ve-primary)"
    }
  },
  ({ isDragging }) => isDragging ? {
    boxShadow: "-1px -1px 0 1px var(--ve-primary)"
  } : null
);
var ResizeBarOverlay = styled28.div({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1001
});

// src/components/Blocs/BlocSelector.tsx
import { useEffect as useEffect8, useMemo as useMemo5, useState as useState11 } from "react";

// src/components/Blocs/BlocSelectorItem.tsx
import styled29 from "@emotion/styled";
import { jsx as jsx36, jsxs as jsxs22 } from "@emotion/react/jsx-runtime";
function BlocSelectorItem({
  definition,
  name,
  iconsUrl,
  onClick
}) {
  const icon = iconsUrl.replace("[name]", name);
  const title = definition.title;
  return /* @__PURE__ */ jsxs22(Button3, { onClick: prevent(onClick), children: [
    /* @__PURE__ */ jsx36(ButtonImage, { children: /* @__PURE__ */ jsx36("img", { src: icon, alt: "" }) }),
    /* @__PURE__ */ jsx36("div", { children: title })
  ] });
}
var Button3 = styled29.button({
  backgroundColor: "transparent",
  border: "none",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  font: "inherit",
  fontWeight: 500,
  cursor: "pointer",
  transition: ".3s",
  "&:hover, &:focus": {
    outline: "none",
    color: "var(--ve-primary)",
    "& img": {
      transform: "translateY(-5px)"
    }
  }
});
var ButtonImage = styled29.div({
  width: "100%",
  backgroundColor: "var(--ve-hover)",
  height: 107,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  transition: ".3s",
  img: {
    width: 120,
    height: 80,
    objectFit: "contain",
    borderRadius: 4,
    transition: "transform .3s"
  },
  "&::after": {
    content: "''",
    position: "absolute",
    inset: 0,
    opacity: 0,
    background: "var(--ve-primary)",
    mixBlendMode: "saturation",
    borderRadius: 4,
    transition: "opacity .3s"
  },
  [`button:hover &::after, button:focus &::after`]: {
    opacity: 1
  },
  [`button:focus &`]: {
    transition: "none",
    border: "2px solid var(--ve-primary)"
  }
});

// src/components/Blocs/BlocSelectorSearch.tsx
import styled30 from "@emotion/styled";
import { jsx as jsx37, jsxs as jsxs23 } from "@emotion/react/jsx-runtime";
var Wrapper12 = styled30.div({
  position: "relative",
  float: "right",
  svg: {
    position: "absolute",
    left: "1rem",
    top: "50%",
    color: "var(--ve-color-light)",
    transform: "translateY(-50%)"
  }
});
var Input2 = styled30.input({
  height: 40,
  background: "var(--ve-hover)",
  borderRadius: 40,
  padding: "0 1rem 0 2.6rem",
  border: "1px solid transparent",
  font: "inherit",
  "&:focus": Styles.FocusState
});
function BlocSelectorSearch({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxs23(Wrapper12, { children: [
    /* @__PURE__ */ jsx37(
      Input2,
      {
        type: "search",
        placeholder: t("searchComponent"),
        value,
        onChange: (e) => onChange(e.target.value)
      }
    ),
    /* @__PURE__ */ jsx37(IconSearch, { size: 14 })
  ] });
}

// src/components/Blocs/BlocSelectorGrid.tsx
import styled31 from "@emotion/styled";
var BlocSelectorGrid = styled31(Tabs.Tab)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 218px)",
  gap: "2rem",
  overflow: "auto",
  maxHeight: "calc(100vh - 300px)",
  marginTop: "2rem",
  alignContent: "flex-start",
  height: 700,
  "&::-webkit-scrollbar": {
    width: 7,
    height: 7
  },
  "&::-webkit-scrollbar-track": {
    background: "var(--ve-hover)",
    padding: 1
  },
  "&::-webkit-scrollbar-thumb": {
    background: "var(--ve-field-border)",
    borderRadius: 4
  },
  "&[hidden]": {
    display: "none"
  }
});

// src/components/Blocs/BlocSelector.tsx
import { jsx as jsx38, jsxs as jsxs24 } from "@emotion/react/jsx-runtime";
var ALL_TAB = "Tous les blocs";
function BlocSelector({ iconsUrl }) {
  const isVisible = useBlocSelectionVisible();
  const setBlockIndex = useSetBlockIndex();
  const [search, setSearch] = useState11("");
  const definitions = useFieldDefinitions();
  const hiddenCategories = useHiddenCategories();
  const addBlock = useAddBlock();
  const categories = useMemo5(() => {
    return [
      ALL_TAB,
      ...Object.values(definitions).filter((d) => d.category).filter((d) => !hiddenCategories.includes(d.category ?? "")).reduce(
        (acc, d) => acc.includes(d.category) ? acc : [...acc, d.category],
        []
      )
    ];
  }, [definitions]);
  useEffect8(() => {
    setSearch("");
  }, [isVisible]);
  if (!isVisible) {
    return null;
  }
  const handleVisibilityChange = (v) => {
    setBlockIndex(null);
  };
  return /* @__PURE__ */ jsxs24(
    Modal,
    {
      visible: isVisible,
      onVisibilityChange: handleVisibilityChange,
      title: t("addComponent"),
      children: [
        /* @__PURE__ */ jsx38(BlocSelectorSearch, { value: search, onChange: setSearch }),
        /* @__PURE__ */ jsx38(Tabs, { css: { margin: "1.5rem 0" }, children: categories.map((category) => /* @__PURE__ */ jsx38(BlocSelectorGrid, { title: category, children: Object.keys(definitions).filter(
          (key) => !hiddenCategories.includes(definitions[key].category ?? "")
        ).filter(searchDefinition(search ?? "", category, definitions)).map((key) => /* @__PURE__ */ jsx38(
          BlocSelectorItem,
          {
            definition: definitions[key],
            name: key,
            iconsUrl,
            onClick: () => addBlock(key)
          },
          key
        )) }, category)) })
      ]
    }
  );
}
function searchDefinition(search, category, definitions) {
  return (key) => {
    const categoryFilter = category === ALL_TAB ? true : definitions[key].category === category;
    const searchFilter = search === "" ? true : definitions[key].title.toLowerCase().includes(search.toLowerCase());
    return categoryFilter && searchFilter;
  };
}

// src/components/RollbackMessage.tsx
import { jsx as jsx39 } from "@emotion/react/jsx-runtime";
function RollbackMessage() {
  const {
    message: rollbackMessage,
    rollback,
    voidRollback
  } = useRollbackMessage();
  return /* @__PURE__ */ jsx39(
    Flash,
    {
      action: t("rollback"),
      onClick: rollback,
      duration: 3,
      onHide: voidRollback,
      children: rollbackMessage
    }
  );
}

// src/components/Layout.tsx
import styled33 from "@emotion/styled";
import { keyframes as keyframes6 } from "@emotion/react";

// src/components/Layout/SidebarToggleButton.tsx
import styled32 from "@emotion/styled";
import { jsx as jsx40 } from "@emotion/react/jsx-runtime";
function SidebarToggleButton({
  collapsed,
  onClick
}) {
  return /* @__PURE__ */ jsx40(Button4, { onClick: prevent(onClick), collapsed, children: /* @__PURE__ */ jsx40(IconBack, { size: 20 }) });
}
var Button4 = styled32(ButtonIcon)(
  {
    position: "absolute",
    top: "10px",
    zIndex: 1001,
    boxShadow: "var(--ve-field-shadow)",
    border: "1px solid var(--ve-hover)",
    transition: "opacity .3s",
    "&:hover": { opacity: 1 }
  },
  (props) => ({
    left: props.collapsed ? "1em" : "calc(var(--ve-clampedSidebar) + 1em)",
    opacity: props.collapsed ? 1 : 0,
    transform: props.collapsed ? "rotate(180deg)" : "none"
  })
);

// src/components/Preview/PreviewPostMessage.tsx
import { useEffect as useEffect9, useRef as useRef10, useState as useState12 } from "react";
import { useWindowSize as useWindowSize2 } from "react-use";
import { jsx as jsx41 } from "@emotion/react/jsx-runtime";
function PreviewPostMessage({ data, previewUrl }) {
  const iframe = useRef10(null);
  const [loaded, setLoaded] = useState12(false);
  const previewMode = usePreviewMode();
  const { height: windowHeight } = useWindowSize2();
  let transform = void 0;
  const setFocusIndex = useSetFocusIndex();
  const setAddBlockIndex = useSetBlockIndex();
  const focusIndex = useFocusIndex();
  const previewUrlRef = useRef10(previewUrl);
  previewUrlRef.current = previewUrl;
  if (previewMode === 0 /* PHONE */ && windowHeight < 844) {
    transform = { transform: `scale(${windowHeight / PHONE_HEIGHT})` };
  }
  useEffect9(() => {
    const listener = (e) => {
      if (e.data.type === "ve-focus") {
        setFocusIndex(e.data.payload.id);
      } else if (e.data.type === "ve-add") {
        console.log({ id: e.data.payload.id });
        setAddBlockIndex(e.data.payload.id);
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);
  useEffect9(() => {
    if (loaded && iframe.current && iframe.current.contentWindow) {
      iframe.current.contentWindow.postMessage({
        type: "ve-data",
        payload: data
      }, previewUrlRef.current);
    }
  }, [loaded, data]);
  useEffect9(() => {
    if (iframe.current && iframe.current.contentWindow) {
      iframe.current.contentWindow.postMessage({
        type: "ve-focus",
        payload: { id: focusIndex }
      }, previewUrlRef.current);
    }
  }, [focusIndex]);
  const previewURLWithReferrer = new URL(previewUrl);
  previewURLWithReferrer.searchParams.set("referrer", window.location.toString());
  return /* @__PURE__ */ jsx41(PreviewWrapper, { children: /* @__PURE__ */ jsx41(
    StyledIframe,
    {
      ref: iframe,
      src: previewURLWithReferrer.toString(),
      loaded,
      mobile: previewMode === 0 /* PHONE */,
      style: transform,
      onLoad: () => setLoaded(true)
    }
  ) });
}

// src/components/Layout.tsx
import { Fragment as Fragment8, jsx as jsx42, jsxs as jsxs25 } from "@emotion/react/jsx-runtime";
function Layout({ data, previewUrl, onClose, iconsUrl }) {
  const [sidebarCollapsed, toggleSidebar] = useToggle(false);
  const showResizeControl = !sidebarCollapsed;
  const PreviewComponent = VisualEditor.postMessagePreview ? PreviewPostMessage : Preview;
  return /* @__PURE__ */ jsx42(Fragment8, { children: /* @__PURE__ */ jsxs25(Wrapper13, { withSidebar: !sidebarCollapsed, children: [
    /* @__PURE__ */ jsx42(
      Sidebar,
      {
        data,
        onClose,
        css: {
          display: sidebarCollapsed ? "none" : void 0
        }
      }
    ),
    previewUrl && /* @__PURE__ */ jsx42(PreviewComponent, { data, previewUrl }),
    /* @__PURE__ */ jsx42(
      SidebarToggleButton,
      {
        collapsed: sidebarCollapsed,
        onClick: toggleSidebar
      }
    ),
    showResizeControl && /* @__PURE__ */ jsx42(ResizeBar, {}),
    /* @__PURE__ */ jsx42(BlocSelector, { iconsUrl }),
    /* @__PURE__ */ jsx42(RollbackMessage, {})
  ] }) });
}
function Wrapper13(props) {
  const sidebarWidth2 = useSidebarWidth();
  return /* @__PURE__ */ jsx42(
    StyledWrapper,
    {
      ...props,
      style: { "--ve-sidebar": `${sidebarWidth2}vw` }
    }
  );
}
var In3 = keyframes6({
  from: { backgroundColor: "rgba(255, 255, 255, 0)" },
  to: { backgroundColor: "var(--ve-field-border)" }
});
var Out3 = keyframes6({
  from: { backgroundColor: "var(--ve-field-border)" },
  to: { backgroundColor: "rgba(255, 255, 255, 0)" }
});
var StyledWrapper = styled33.div(
  {
    isolation: "isolate",
    zIndex: 9999,
    fontSize: "15px",
    "--ve-sidebar": "600px",
    "--ve-clampedSidebar": "clamp(450px, var(--ve-sidebar), calc(100vw - 375px))",
    color: "var(--ve-color-light)",
    transition: "background-color .3s",
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    display: "grid",
    backgroundColor: "var(--ve-field-border)",
    animation: `${In3} .7s cubic-bezier(0.19, 1, 0.22, 1) both`,
    '[hidden="hidden"] &': {
      animation: `${Out3} .7s cubic-bezier(0.19, 1, 0.22, 1) both`
    },
    "& *": {
      "&::-webkit-scrollbar": { width: "7px", height: "7px" },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
        padding: "1px"
      },
      "&::-webkit-scrollbar-thumb": {
        background: "var(--ve-field-border)",
        borderRadius: "4px"
      }
    }
  },
  (props) => ({
    gridTemplateColumns: props.withSidebar ? "var(--ve-clampedSidebar) 1fr" : "1fr"
  })
);

// src/hooks/useClipboardPaste.ts
import { useEffect as useEffect10 } from "react";
function useClipboardPaste(enabled) {
  const insertData = useInsertData();
  useEffect10(() => {
    if (!enabled) {
      return;
    }
    const listener = (event) => {
      try {
        let paste = (event.clipboardData || window.clipboardData).getData("text").trim();
        if (paste.startsWith("{")) {
          event.preventDefault();
          const data = JSON.parse(paste);
          if (data._name) {
            insertData(data._name, 0, indexify(data));
          }
        } else if (paste.startsWith("[")) {
          event.preventDefault();
          const data = JSON.parse(paste);
          if (data.length > 0) {
            for (let i = data.length - 1; i >= 0; i--) {
              insertData(data[i]._name, 0, indexify(data[i]));
            }
          }
        }
      } catch (e) {
      }
    };
    document.addEventListener("paste", listener);
    return () => {
      document.removeEventListener("paste", listener);
    };
  }, [insertData, enabled]);
}

// src/hooks/useStateDelayed.ts
import { useEffect as useEffect11, useState as useState13 } from "react";
function useStateDelayed(originalState, duration = 700, onlyOnFalse = true) {
  const [delayedState, setDelayedState] = useState13(originalState);
  useEffect11(() => {
    if (originalState && onlyOnFalse) {
      setDelayedState(originalState);
    } else {
      const timer = window.setTimeout(() => setDelayedState(originalState), 700);
      return () => window.clearTimeout(timer);
    }
  }, [originalState]);
  return delayedState;
}

// src/langs/en.ts
var Translations = {
  unknownComponent: "Unknown component",
  deleteComponent: "Remove component",
  copyPage: "Copier le code de la page",
  copyComponent: "Copy the component",
  searchComponent: "Search a component",
  copySuccess: "The code has been copied",
  copyInstructions: "You can paste the component on another page (CTRL + V)",
  addComponent: "Add a component",
  responsiveView: "Responsive view",
  addItem: "Add an item",
  deleteItem: "Remove item",
  rollback: "Restore",
  deleteItemConfirm: "The component has been deleted",
  save: "Save",
  close: "Close",
  noContent: `You have no content yet`,
  useTemplate: "Use a template",
  poweredBy: "Powered by"
};

// src/hooks/useStopPropagation.ts
import { useEffect as useEffect12 } from "react";
var stopPropagation = (e) => e.stopPropagation();
function useStopPropagation(ref, eventNames) {
  useEffect12(() => {
    if (!ref.current) {
      return;
    }
    eventNames.map((eventName) => {
      ref.current.addEventListener(eventName, stopPropagation);
    });
    return () => {
      if (!ref.current) {
        return;
      }
      eventNames.map((eventName) => {
        ref.current.removeEventListener(eventName, stopPropagation);
      });
    };
  });
}

// src/elements/PreviewWrapper.tsx
import { createRoot } from "react-dom/client";
import { jsx as jsx43, jsxs as jsxs26 } from "@emotion/react/jsx-runtime";
var PreviewWrapper2 = class extends (isClientSide() ? HTMLElement : class {
}) {
  constructor() {
    super(...arguments);
    __publicField(this, "isFocused", false);
    __publicField(this, "root");
    __publicField(this, "referrer", () => {
      return new URL(document.location.toString()).searchParams.get("referrer") ?? "";
    });
    __publicField(this, "onWrapperClick", () => {
      window.parent.postMessage({ type: "ve-focus", payload: { id: this.dataset.id, parent: true } }, this.referrer());
    });
    __publicField(this, "onAddClick", (e) => {
      e.stopPropagation();
      e.preventDefault();
      window.parent.postMessage({ type: "ve-add", payload: { id: this.dataset.id } }, this.referrer());
    });
    __publicField(this, "onFocusChange", (e) => {
      if (e.data.type === "ve-focus") {
        const isFocused = e.data.payload.id === this.dataset.id;
        if (isFocused !== this.isFocused) {
          this.isFocused = e.data.payload.id === this.dataset.id;
          this.render();
        }
      }
    });
  }
  render() {
    if (!this.root) {
      return;
    }
    this.root.render(/* @__PURE__ */ jsxs26(Reset, { complete: false, children: [
      /* @__PURE__ */ jsx43(PreviewAddFloating, { onClick: this.onAddClick, style: { position: "absolute", top: 0, left: 0, right: 0 } }),
      /* @__PURE__ */ jsx43(
        PreviewItemWrapper,
        {
          isFocused: this.isFocused,
          style: { position: "absolute", inset: 0 },
          onClick: this.onWrapperClick,
          children: this.dataset.name && /* @__PURE__ */ jsx43(PreviewItemTitle, { isFocused: this.isFocused, children: this.dataset.name })
        }
      )
    ] }));
  }
  connectedCallback() {
    this.style.setProperty("position", "relative");
    this.style.setProperty("display", "block");
    window.addEventListener("message", this.onFocusChange);
    const div = document.createElement("div");
    this.appendChild(div);
    this.root = createRoot(div);
    this.render();
  }
  disconnectedCallback() {
    window.removeEventListener("message", this.onFocusChange);
  }
};

// src/elements/AddButton.tsx
import { createRoot as createRoot2 } from "react-dom/client";
import { jsx as jsx44 } from "@emotion/react/jsx-runtime";
var AddButton = class extends (isClientSide() ? HTMLElement : class {
}) {
  connectedCallback() {
    const div = document.createElement("div");
    this.appendChild(div);
    const referrer = new URL(document.location.toString()).searchParams.get("referrer") ?? "";
    const onAddClick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      window.parent.postMessage({ type: "ve-add", payload: { id: parseInt(this.dataset.index ?? "0") } }, referrer);
    };
    createRoot2(div).render(
      /* @__PURE__ */ jsx44(Reset, { complete: true, children: /* @__PURE__ */ jsx44(PreviewAddButton, { onClick: onAddClick }) })
    );
  }
};

// src/hooks/useUniqId.ts
import { useMemo as useMemo6 } from "react";
function useUniqId(prefix = "") {
  return useMemo6(() => prefix + uniqId(), []);
}

// src/fields/utils.ts
function defineField(args) {
  return (name, options = {}) => {
    const fieldArgs = typeof args === "function" ? args() : args;
    return {
      ...genericFieldDefinition(fieldArgs, options),
      ...fieldArgs,
      options: { ...fieldArgs.defaultOptions, ...options },
      name,
      group: false
    };
  };
}
function defineFieldGroup(args) {
  return (fields, options = {}) => {
    return {
      ...genericFieldDefinition(args, options),
      group: true,
      fields,
      render: args.render
    };
  };
}
function defaultFieldProperties() {
  return {
    conditions: [],
    shouldRender(data) {
      return this.conditions.filter((condition) => !condition(data)).length === 0;
    },
    when(fieldName, expectedValue = true) {
      return {
        ...this,
        conditions: [
          ...this.conditions,
          (data) => {
            if (typeof expectedValue === "function") {
              return expectedValue(data[fieldName]);
            }
            return cast(data[fieldName], expectedValue) === expectedValue;
          }
        ]
      };
    }
  };
}
function genericFieldDefinition(args, options) {
  return {
    options: { ...args.defaultOptions, ...options },
    ...defaultFieldProperties()
  };
}

// src/fields/Text.tsx
import { jsx as jsx45 } from "@emotion/react/jsx-runtime";
var Component = ({
  value,
  onChange,
  options
}) => {
  const id = useUniqId("textinput");
  return /* @__PURE__ */ jsx45(
    Field,
    {
      label: options.label,
      type: options.multiline ? "textarea" : "text",
      id,
      value,
      onInput: (e) => onChange(e.target.value),
      help: options.help
    }
  );
};
var Text = defineField({
  defaultOptions: {
    default: ""
  },
  render: Component
});

// src/fields/Checkbox.tsx
import styled34 from "@emotion/styled";
import { jsx as jsx46, jsxs as jsxs27 } from "@emotion/react/jsx-runtime";
var Component2 = ({
  value,
  onChange,
  options
}) => {
  const id = useUniqId("checkbox");
  return /* @__PURE__ */ jsx46(Field, { help: options.help, children: /* @__PURE__ */ jsxs27(Wrapper14, { children: [
    /* @__PURE__ */ jsx46(
      Input3,
      {
        type: "checkbox",
        id,
        checked: value,
        onChange: () => onChange(!value)
      }
    ),
    /* @__PURE__ */ jsx46(Label2, { htmlFor: id, children: options.label })
  ] }) });
};
var Checkbox = defineField({
  defaultOptions: {
    label: "",
    default: false
  },
  render: Component2
});
var Wrapper14 = styled34.div({
  position: "relative",
  display: "flex"
});
var Input3 = styled34("input", { target: "ve-checkbox-input" })({
  position: "absolute",
  inset: 0,
  opacity: 0,
  cursor: "pointer",
  zIndex: 5
});
var Label2 = styled34.label({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  lineHeight: 1,
  "&::before": {
    cursor: "pointer",
    display: "block",
    content: "''",
    width: "38px",
    height: "20px",
    border: "solid 1px var(--ve-field-border)",
    borderRadius: "18px",
    marginRight: ".5em",
    transition: ".3s"
  },
  "&::after": {
    position: "absolute",
    content: "''",
    top: "2px",
    left: "2px",
    borderRadius: "16px",
    width: "16px",
    height: "16px",
    backgroundColor: "var(--ve-color-light)",
    transition: ".3s"
  },
  [`${Input3}:checked + &::before`]: {
    borderColor: "var(--ve-primary)",
    backgroundColor: "var(--ve-primary)"
  },
  [`${Input3}:focus + &::before`]: {
    outline: "0",
    boxShadow: "0 0 0 0.25rem rgb(23 113 230 / 25%)"
  },
  [`${Input3}:checked + &::after`]: {
    backgroundColor: "#FFF",
    transform: "translateX(17px)"
  }
});

// src/fields/Repeater.tsx
import { useMemo as useMemo7, useState as useState14 } from "react";
import styled35 from "@emotion/styled";
import { jsx as jsx47, jsxs as jsxs28 } from "@emotion/react/jsx-runtime";
var Wrapper15 = styled35.div({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)"
});
var Item = styled35(Sortable)({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: ".5em",
  padding: ".4rem .7rem .4rem calc(10px + .7rem)",
  borderBottom: "solid 1px rgba(0,0,0,0.06)",
  backgroundColor: "#fff"
});
var ItemBody = styled35.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1em"
});
var Footer = styled35.div({
  display: "flex",
  justifyContent: "flex-end",
  padding: ".2rem",
  backgroundColor: "rgba(0,0,0,0.03)"
});
var Component3 = ({
  value: valueProps,
  onChange,
  options
}) => {
  const value = valueProps ?? [];
  const canAdd = !options.max || value.length < options.max;
  const canRemove = !options.min || value.length > options.min;
  const [lastAdditionIndex, setLastAdditionIndex] = useState14(-1);
  const add = () => {
    onChange([
      ...value,
      fillDefaults({ _id: uniqId() }, options.fields)
    ]);
    setLastAdditionIndex(value.length);
  };
  const remove = (line) => {
    onChange(value.filter((v) => v !== line));
  };
  const updateProperty = (v, path) => {
    onChange(deepSet(value, path, v));
  };
  function handleMove(from, to) {
    onChange(moveItem(value, from, to));
  }
  return /* @__PURE__ */ jsx47(Field, { label: options.label, children: /* @__PURE__ */ jsx47(SortableWrapper, { items: value, onMove: handleMove, children: /* @__PURE__ */ jsxs28(Wrapper15, { children: [
    value.map((line, k) => /* @__PURE__ */ jsx47(
      FieldLine,
      {
        line,
        index: k,
        onUpdate: updateProperty,
        onRemove: canRemove ? remove : null,
        options,
        defaultCollapsed: lastAdditionIndex !== k
      },
      line._id
    )),
    canAdd && /* @__PURE__ */ jsx47(Footer, { children: /* @__PURE__ */ jsx47(Button, { secondary: true, onClick: prevent(add), icon: IconCirclePlus, children: options.addLabel }) })
  ] }) }) });
};
var FieldLine = ({ line, index, onRemove, onUpdate, options, defaultCollapsed }) => {
  const [collapsed, toggleCollapsed] = useToggle(defaultCollapsed);
  const title = options.collapsed ? line[options.collapsed] : `#${index + 1}`;
  const escapedTitle = useMemo7(() => textContent(title), [title]);
  return /* @__PURE__ */ jsxs28(Item, { item: line, children: [
    /* @__PURE__ */ jsxs28(SidebarHeading, { onClick: prevent(toggleCollapsed), title: escapedTitle, children: [
      /* @__PURE__ */ jsx47(SidebarHeading.Hover, { children: onRemove && /* @__PURE__ */ jsx47(
        ButtonIcon,
        {
          danger: true,
          onClick: () => onRemove(line),
          title: t("deleteItem"),
          children: /* @__PURE__ */ jsx47(IconTrash, { size: 20 })
        }
      ) }),
      /* @__PURE__ */ jsx47(
        ButtonIcon,
        {
          rotate: collapsed ? -90 : 0,
          onClick: prevent(toggleCollapsed),
          children: /* @__PURE__ */ jsx47(IconDown, { size: 24 })
        }
      )
    ] }),
    !collapsed && /* @__PURE__ */ jsx47(ItemBody, { children: /* @__PURE__ */ jsx47(
      FieldsRenderer,
      {
        fields: options.fields,
        data: line,
        onUpdate,
        path: index.toString()
      }
    ) })
  ] });
};
var Repeater = defineField(() => ({
  defaultOptions: { addLabel: t("addItem"), fields: [], default: [] },
  render: Component3
}));

// src/fields/ImageUrl.tsx
import styled36 from "@emotion/styled";
import { jsx as jsx48 } from "@emotion/react/jsx-runtime";
var Component4 = ({
  value,
  onChange,
  options
}) => {
  const id = useUniqId("imageinput");
  const handleBrowse = () => {
    options.onBrowse(value).then((v) => {
      onChange(v);
    }).catch((e) => {
    });
  };
  return /* @__PURE__ */ jsx48(
    Field,
    {
      id,
      label: options.label,
      help: options.help,
      value,
      tooltip: value ? /* @__PURE__ */ jsx48(TooltipImage, { src: value, alt: "" }) : void 0,
      onChange: (e) => onChange(e.target.value),
      css: { paddingRight: 40 },
      icon: options.onBrowse ? /* @__PURE__ */ jsx48(Button5, { onClick: prevent(handleBrowse), children: /* @__PURE__ */ jsx48(IconFolder, { size: 16 }) }) : void 0
    }
  );
};
var ImageUrl = defineField({
  defaultOptions: {
    default: ""
  },
  render: Component4
});
var Button5 = styled36(ButtonIcon)({
  width: "32px",
  height: "32px",
  color: "var(--ve-color-light)"
});
var TooltipImage = styled36.img({
  width: "150px",
  height: "150px",
  position: "relative",
  zIndex: 2,
  objectFit: "cover"
});

// src/components/Editor/TiptapEditor/TiptapEditor.tsx
import { EditorContent, useEditor } from "@tiptap/react";
import { Node } from "@tiptap/core";
import Text2 from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";

// src/components/Editor/TiptapEditor/TiptapToolbar.tsx
import { BubbleMenu } from "@tiptap/react";
import styled40 from "@emotion/styled";

// src/components/Editor/TiptapEditor/TiptapToolbarButton.tsx
import styled37 from "@emotion/styled";
var TiptapToolbarButton = styled37(UnstyledButton)(
  {
    height: 40,
    width: 28,
    flex: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      color: "#FFF"
    }
  },
  (props) => ({
    color: props.active ? "#FFF" : "#CCC",
    background: props.active ? "rgba(255, 255, 255, .1)" : void 0
  })
);

// src/components/Editor/TiptapEditor/TiptapIcons.tsx
import { jsx as jsx49 } from "@emotion/react/jsx-runtime";
function IconBold({ size = 24 }) {
  return /* @__PURE__ */ jsx49(
    "svg",
    {
      width: size,
      height: size,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ jsx49(
        "path",
        {
          d: "M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconItalic({ size = 24 }) {
  return /* @__PURE__ */ jsx49(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx49(
        "path",
        {
          d: "M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconUnderline({ size = 24 }) {
  return /* @__PURE__ */ jsx49(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx49(
        "path",
        {
          d: "M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconMark({ size = 24 }) {
  return /* @__PURE__ */ jsx49(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx49(
        "path",
        {
          d: "M15.243 4.515l-6.738 6.737-.707 2.121-1.04 1.041 2.828 2.829 1.04-1.041 2.122-.707 6.737-6.738-4.242-4.242zm6.364 3.535a1 1 0 0 1 0 1.414l-7.779 7.779-2.12.707-1.415 1.414a1 1 0 0 1-1.414 0l-4.243-4.243a1 1 0 0 1 0-1.414l1.414-1.414.707-2.121 7.779-7.779a1 1 0 0 1 1.414 0l5.657 5.657zm-6.364-.707l1.414 1.414-4.95 4.95-1.414-1.414 4.95-4.95zM4.283 16.89l2.828 2.829-1.414 1.414-4.243-1.414 2.828-2.829z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconLink({ size = 24 }) {
  return /* @__PURE__ */ jsx49(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx49(
        "path",
        {
          d: "M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconClear({ size = 24 }) {
  return /* @__PURE__ */ jsx49(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx49(
        "path",
        {
          d: "M12.651 14.065L11.605 20H9.574l1.35-7.661-7.41-7.41L4.93 3.515 20.485 19.07l-1.414 1.414-6.42-6.42zm-.878-6.535l.27-1.53h-1.8l-2-2H20v2h-5.927L13.5 9.257 11.773 7.53z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconList({ size = 24 }) {
  return /* @__PURE__ */ jsx49(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx49(
        "path",
        {
          d: "M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconQuote({ size = 24 }) {
  return /* @__PURE__ */ jsx49(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx49(
        "path",
        {
          d: "M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconOrderedList({ size = 24 }) {
  return /* @__PURE__ */ jsx49(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx49(
        "path",
        {
          d: "M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z",
          fill: "currentColor"
        }
      )
    }
  );
}
function IconHeading({
  size = 24,
  level
}) {
  let path = "";
  if (level === void 0) {
    path = "M17 11V4h2v17h-2v-8H7v8H5V4h2v7z";
  } else if (level === 1) {
    path = "M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z";
  } else if (level === 2) {
    path = "M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z";
  } else if (level === 3) {
    path = "M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z";
  } else if (level === 4) {
    path = "M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm9-12v8h1.5v2H22v2h-2v-2h-5.5v-1.34l5-8.66H22zm-2 3.133L17.19 16H20v-4.867z";
  } else if (level === 5) {
    path = "M22 8v2h-4.323l-.464 2.636c.33-.089.678-.136 1.037-.136 2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.827 0-3.367-1.224-3.846-2.897l1.923-.551c.24.836 1.01 1.448 1.923 1.448 1.105 0 2-.895 2-2s-.895-2-2-2c-.63 0-1.193.292-1.56.748l-1.81-.904L16 8h6zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z";
  } else if (level === 6) {
    path = "M21.097 8l-2.598 4.5c2.21 0 4.001 1.79 4.001 4s-1.79 4-4 4-4-1.79-4-4c0-.736.199-1.426.546-2.019L18.788 8h2.309zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z";
  }
  return /* @__PURE__ */ jsx49(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx49("path", { d: path, fill: "currentColor" })
    }
  );
}
function IconAlign({
  size = 24,
  direction = "left"
}) {
  if (direction === "left") {
    return /* @__PURE__ */ jsx49(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: size,
        height: size,
        children: /* @__PURE__ */ jsx49(
          "path",
          {
            d: "M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z",
            fill: "currentColor"
          }
        )
      }
    );
  } else if (direction === "right") {
    return /* @__PURE__ */ jsx49(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: size,
        height: size,
        children: /* @__PURE__ */ jsx49(
          "path",
          {
            d: "M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z",
            fill: "currentColor"
          }
        )
      }
    );
  } else if (direction === "center") {
    return /* @__PURE__ */ jsx49(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: size,
        height: size,
        children: /* @__PURE__ */ jsx49(
          "path",
          {
            d: "M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z",
            fill: "currentColor"
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx49(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      children: /* @__PURE__ */ jsx49(
        "path",
        {
          d: "M3 4h18v2H3V4zm0 15h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V9z",
          fill: "currentColor"
        }
      )
    }
  );
}

// src/components/Editor/TiptapEditor/TiptapToolbar.tsx
import {
  useEffect as useEffect14,
  useState as useState15
} from "react";

// src/components/Editor/TiptapEditor/TiptapDropdown.tsx
import styled38 from "@emotion/styled";
var baseHeight = 40;
var TiptapDropdown = styled38.div(
  {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    background: "#444",
    height: baseHeight,
    flex: "none",
    overflow: "hidden",
    alignItems: "center",
    transition: "height .2s, transform .3s",
    transformOrigin: "50% 0",
    borderRadius: 3,
    "& > *": {
      height: baseHeight - 10
    },
    "& > *:first-of-type": {
      marginTop: 0,
      transition: "margin .3s",
      height: baseHeight
    },
    "&:hover > *:first-of-type": {
      marginTop: -3
    },
    "&:hover": {
      transform: "scale(1.2)"
    }
  },
  (props) => ({
    "&:hover": {
      height: baseHeight * props.size - 10 * (props.size - 1)
    }
  })
);

// src/components/Editor/TiptapEditor/TiptapToolbarAlign.tsx
import { jsx as jsx50, jsxs as jsxs29 } from "@emotion/react/jsx-runtime";
var TiptapToolbarAlign = ({
  editor
}) => {
  const alignments = ["left", "center", "right", "justify"];
  const currentAlign = alignments.filter(
    (align) => editor.isActive({ textAlign: align })
  )[0];
  if (!editor.can().setParagraph()) {
    return null;
  }
  return /* @__PURE__ */ jsxs29(TiptapDropdown, { size: alignments.length, children: [
    /* @__PURE__ */ jsx50(TiptapToolbarButton, { title: capitalize(currentAlign), type: "button", children: /* @__PURE__ */ jsx50(IconAlign, { size: 16, direction: currentAlign }) }),
    alignments.filter((align) => align !== currentAlign).map((align) => /* @__PURE__ */ jsx50(
      TiptapToolbarButton,
      {
        onClick: prevent(
          () => editor.chain().focus().setTextAlign(align).run()
        ),
        css: { height: 30 },
        title: capitalize(align),
        children: /* @__PURE__ */ jsx50(IconAlign, { size: 16, direction: align })
      },
      align
    ))
  ] });
};

// src/components/Editor/TiptapEditor/TiptapToolbarHeadings.tsx
import { jsx as jsx51, jsxs as jsxs30 } from "@emotion/react/jsx-runtime";
var TiptapToolbarHeadings = ({
  editor
}) => {
  const levels = [2, 3, 4, 5, 6];
  const currentLevel = editor.getAttributes("heading").level;
  if (!("toggleHeading" in editor.can()) || !editor.can().toggleHeading({ level: 2 })) {
    return null;
  }
  const clickHandler = (level) => prevent(() => {
    if (!level) {
      return;
    }
    editor.chain().focus().toggleHeading({ level }).run();
  });
  return /* @__PURE__ */ jsxs30(TiptapDropdown, { size: levels.length + 1, children: [
    /* @__PURE__ */ jsx51(TiptapToolbarButton, { active: !!currentLevel, onClick: clickHandler(currentLevel), children: /* @__PURE__ */ jsx51(IconHeading, { size: 16, level: currentLevel }) }),
    levels.map((level) => /* @__PURE__ */ jsx51(
      TiptapToolbarButton,
      {
        active: level === currentLevel,
        onClick: clickHandler(level),
        css: { height: 30 },
        children: /* @__PURE__ */ jsx51(IconHeading, { size: 16, level })
      },
      level
    ))
  ] });
};

// src/components/Editor/TiptapEditor/TiptapColorPicker.tsx
import { useEffect as useEffect13, useMemo as useMemo8 } from "react";

// src/functions/css.ts
function colorToProperty(color) {
  if (typeof color !== "string") {
    return void 0;
  }
  if (color.startsWith("--")) {
    return `var(${color})`;
  }
  return color;
}

// src/components/Editor/TiptapEditor/TiptapColorPicker.tsx
import styled39 from "@emotion/styled";
import { jsx as jsx52, jsxs as jsxs31 } from "@emotion/react/jsx-runtime";
function TiptapColorPicker({ editor, colors }) {
  const currentColor = editor?.getAttributes("textStyle").color;
  const cssColors = useMemo8(
    () => colors.map(colorToProperty),
    [colors]
  );
  const [expanded, toggleExpanded, setExpanded] = useToggle();
  const handleChange = (color) => {
    toggleExpanded();
    editor.chain().focus().setColor(color).run();
  };
  useEffect13(() => {
    if (editor.isFocused) {
      setExpanded(false);
    }
  }, [editor.isFocused]);
  if (colors.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs31("div", { css: { position: "relative" }, children: [
    /* @__PURE__ */ jsx52(TiptapToolbarButton, { onClick: prevent(toggleExpanded), children: /* @__PURE__ */ jsxs31(
      "svg",
      {
        width: 16,
        height: 16,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ jsx52(
            "path",
            {
              d: "M15.246 14H8.754L7.154 18H5L11 3H13L19 18H16.846L15.246 14ZM14.446 12L12 5.885L9.554 12H14.446Z",
              fill: "currentColor"
            }
          ),
          /* @__PURE__ */ jsx52("path", { d: "M3 20H21V22H3V20Z", fill: currentColor || "currentColor" })
        ]
      }
    ) }),
    expanded && /* @__PURE__ */ jsx52(Palette, { colors: cssColors, onChange: handleChange })
  ] });
}
var PaletteWrapper = styled39.div(
  {
    position: "absolute",
    top: "100%",
    right: 0,
    background: "#444",
    display: "grid",
    gridGap: 3,
    padding: 4
  },
  (props) => ({
    gridTemplateColumns: `repeat(${Math.ceil(props.size / 3)}, 16px)`
  })
);
var PaletteItem = styled39.button({
  width: 16,
  height: 16,
  border: "1px solid transparent",
  cursor: "pointer",
  "&:hover": {
    borderColor: "white",
    transform: "scale(1.5)"
  }
});
function Palette({
  colors,
  onChange
}) {
  const changeHandler = (color) => prevent(() => onChange(color));
  return /* @__PURE__ */ jsx52(PaletteWrapper, { size: colors.length, children: colors.map((color) => /* @__PURE__ */ jsx52(
    PaletteItem,
    {
      onClick: changeHandler(color),
      style: { backgroundColor: color }
    },
    color
  )) });
}

// src/components/Editor/TiptapEditor/TiptapToolbar.tsx
import { Fragment as Fragment9, jsx as jsx53, jsxs as jsxs32 } from "@emotion/react/jsx-runtime";
var iconSize = 16;
function TiptapToolbar({ editor, colors }) {
  const [mode, setMode] = useState15(0 /* Buttons */);
  const setLinkMode = () => setMode(1 /* Link */);
  const setButtonsMode = () => setMode(0 /* Buttons */);
  const insertLink = (link) => {
    editor.commands.setLink({ href: link });
  };
  let rootElement = null;
  try {
    rootElement = useRootElement();
  } catch (e) {
  }
  useEffect14(() => {
    if (editor.isFocused) {
      setMode(0 /* Buttons */);
    }
  }, [editor.isFocused]);
  return /* @__PURE__ */ jsx53(
    Toolbar,
    {
      className: "WysiwygToolbar",
      editor,
      shouldShow: ({ from, to }) => from !== to,
      tippyOptions: {
        maxWidth: 500,
        ...rootElement ? {
          appendTo: () => rootElement
        } : {}
      },
      children: mode === 1 /* Link */ ? /* @__PURE__ */ jsx53(ToolbarLink, { onSubmit: insertLink, onCancel: setButtonsMode }) : /* @__PURE__ */ jsx53(
        ToolbarButtons,
        {
          editor,
          onLinkClick: setLinkMode,
          colors
        }
      )
    }
  );
}
function ToolbarLink({
  onSubmit,
  onCancel
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };
  const handleSubmit = (e) => {
    const data = new FormData(e.target);
    const link = data.get("link");
    if (link) {
      onSubmit(link.toString());
    } else {
      onCancel(link);
    }
  };
  return /* @__PURE__ */ jsxs32(Flex, { as: "form", onKeyDown: handleKeyDown, onSubmit: prevent(handleSubmit), children: [
    /* @__PURE__ */ jsx53(LinkInput, { name: "link", type: "text", placeholder: "https://...", autoFocus: true }),
    /* @__PURE__ */ jsx53(TiptapToolbarButton, { children: "Ok" })
  ] });
}
function ToolbarButtons({
  editor,
  onLinkClick,
  colors
}) {
  const clearFormat = () => editor.chain().focus().clearNodes().unsetAllMarks().run();
  const toggleLink = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    } else {
      onLinkClick();
    }
  };
  return /* @__PURE__ */ jsxs32(Fragment9, { children: [
    editor.can().toggleOrderedList() && /* @__PURE__ */ jsx53(
      TiptapToolbarButton,
      {
        onClick: prevent(
          () => editor.chain().focus().toggleOrderedList().run()
        ),
        active: editor.isActive("orderedList"),
        title: "Ordered List",
        children: /* @__PURE__ */ jsx53(IconOrderedList, { size: iconSize })
      }
    ),
    editor.can().toggleBulletList() && /* @__PURE__ */ jsx53(
      TiptapToolbarButton,
      {
        onClick: prevent(
          () => editor.chain().focus().toggleBulletList().run()
        ),
        active: editor.isActive("bulletList"),
        title: "Unordered List",
        children: /* @__PURE__ */ jsx53(IconList, { size: iconSize })
      }
    ),
    editor.can().toggleBlockquote() && /* @__PURE__ */ jsx53(
      TiptapToolbarButton,
      {
        onClick: prevent(
          () => editor.chain().focus().toggleBlockquote().run()
        ),
        active: editor.isActive("blockquote"),
        title: "Blockquote",
        children: /* @__PURE__ */ jsx53(IconQuote, { size: iconSize })
      }
    ),
    /* @__PURE__ */ jsx53(TiptapToolbarHeadings, { editor }),
    editor.can().toggleBulletList() && /* @__PURE__ */ jsx53(Separator, {}),
    /* @__PURE__ */ jsx53(TiptapToolbarAlign, { editor }),
    /* @__PURE__ */ jsx53(
      TiptapToolbarButton,
      {
        onClick: prevent(() => editor.chain().focus().toggleBold().run()),
        active: editor.isActive("bold"),
        title: "Bold",
        children: /* @__PURE__ */ jsx53(IconBold, { size: iconSize })
      }
    ),
    /* @__PURE__ */ jsx53(
      TiptapToolbarButton,
      {
        onClick: prevent(() => editor.chain().focus().toggleItalic().run()),
        active: editor.isActive("italic"),
        title: "Italic",
        children: /* @__PURE__ */ jsx53(IconItalic, { size: iconSize })
      }
    ),
    /* @__PURE__ */ jsx53(
      TiptapToolbarButton,
      {
        onClick: prevent(() => editor.chain().focus().toggleUnderline().run()),
        active: editor.isActive("underline"),
        title: "Underline",
        children: /* @__PURE__ */ jsx53(IconUnderline, { size: iconSize })
      }
    ),
    /* @__PURE__ */ jsx53(
      TiptapToolbarButton,
      {
        onClick: prevent(() => editor.chain().focus().toggleHighlight().run()),
        active: editor.isActive("highlight"),
        title: "Mark",
        children: /* @__PURE__ */ jsx53(IconMark, { size: iconSize })
      }
    ),
    /* @__PURE__ */ jsx53(TiptapColorPicker, { editor, colors }),
    /* @__PURE__ */ jsx53(Separator, {}),
    /* @__PURE__ */ jsx53(
      TiptapToolbarButton,
      {
        onClick: prevent(toggleLink),
        active: editor.isActive("link"),
        title: "Link",
        children: /* @__PURE__ */ jsx53(IconLink, { size: iconSize })
      }
    ),
    /* @__PURE__ */ jsx53(TiptapToolbarButton, { onClick: prevent(clearFormat), title: "Clear", children: /* @__PURE__ */ jsx53(IconClear, { size: iconSize }) })
  ] });
}
var Toolbar = styled40(BubbleMenu)({
  borderRadius: 25,
  backgroundColor: "#444",
  color: "#FFF",
  height: 40,
  display: "flex",
  padding: "0 1em"
});
var Separator = styled40.div({
  width: ".5em",
  flex: "none"
});
var LinkInput = styled40.input({
  border: "none",
  height: 30,
  color: "inherit",
  font: "inherit",
  background: "transparent",
  outline: "none"
});

// src/components/Editor/TiptapEditor/TiptapEditor.tsx
import Paragraph from "@tiptap/extension-paragraph";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import HardBreak from "@tiptap/extension-hard-break";
import styled41 from "@emotion/styled";
import History from "@tiptap/extension-history";
import Blockquote from "@tiptap/extension-blockquote";
import { useEffect as useEffect15, useRef as useRef12, useState as useState16 } from "react";
import { jsx as jsx54, jsxs as jsxs33 } from "@emotion/react/jsx-runtime";
var SingleDocument = Node.create({
  name: "doc",
  topNode: true,
  group: "block",
  content: "inline*"
});
function TiptapEditor({
  value,
  onChange,
  multiline = false,
  colors = [],
  defaultAlign = "left",
  backgroundColor,
  color
}) {
  const [isFocused, setFocus] = useState16(false);
  const onChangeRef = useRef12(onChange);
  onChangeRef.current = onChange;
  const editor = useEditor({
    extensions: [
      ...multiline ? [Document] : [SingleDocument],
      Paragraph,
      OrderedList,
      BulletList,
      ListItem,
      Text2,
      Bold,
      Italic,
      Highlight,
      Underline,
      TextStyle,
      Color,
      HardBreak,
      History,
      Blockquote,
      Link.configure({ openOnClick: false }),
      Heading.configure({ levels: [2, 3, 4, 5, 6] }),
      TextAlign.configure({
        types: [
          "heading",
          "bulletList",
          "listItem",
          "orderedList",
          "blockquote",
          "paragraph"
        ],
        defaultAlignment: defaultAlign
      })
    ],
    onUpdate: ({ editor: editor2 }) => onChangeRef.current(cleanHTML(editor2.getHTML(), multiline)),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    content: value
  });
  useEffect15(() => {
    if (editor) {
      editor.extensionManager.extensions.find(
        (e) => e.name === "textAlign"
      ).options.defaultAlignment = defaultAlign;
      editor.commands.setContent(value);
    }
  }, [defaultAlign]);
  return /* @__PURE__ */ jsxs33(
    EditorWrapper,
    {
      focused: isFocused,
      style: { textAlign: defaultAlign, color, backgroundColor },
      children: [
        /* @__PURE__ */ jsx54(EditorContent, { editor }),
        editor && /* @__PURE__ */ jsx54(TiptapToolbar, { editor, colors })
      ]
    }
  );
}
var cleanHTML = (str, multiline) => {
  let content = str.replaceAll(
    /(<[uo]l[^>]*>)(.*?)(<\/[uo]l>)/gi,
    (_, openingTag, inner, closingTag) => `${openingTag}${removeParagraphs(inner)}${closingTag}`
  );
  if (!multiline) {
    content = removeParagraphs(content);
  }
  return content.trim();
};
function removeParagraphs(str) {
  return str.replaceAll(/<\/p><p[^>]*>/gi, "<br>").replaceAll(/<p[^>]*>/gi, "").replaceAll(/<\/p>/gi, "");
}
var EditorWrapper = styled41.div(
  {
    color: "var(--ve-color)",
    background: "transparent",
    padding: ".5rem .75em",
    lineHeight: "1.25rem",
    borderRadius: ".2rem",
    display: "block",
    width: "100%",
    border: "solid 1px var(--ve-field-border)",
    boxShadow: "var(--ve-field-shadow)",
    outline: "none",
    "p, ul, ol, h2, h3, h4, h5, h1": {
      margin: "0 0 1em 0"
    },
    "li p": {
      margin: 0
    },
    ".ProseMirror": {
      outline: "none"
    },
    ".ProseMirror > *:last-child": {
      margin: 0
    }
  },
  (props) => ({
    ...props.focused ? Styles.FocusState : void 0,
    p: {
      marginBottom: props.singleLine ? "0" : "1em"
    }
  })
);

// src/fields/HTMLText.tsx
import { jsx as jsx55 } from "@emotion/react/jsx-runtime";
var Component5 = ({
  value,
  onChange,
  options,
  backgroundColor,
  textColor,
  defaultAlign
}) => {
  return /* @__PURE__ */ jsx55(Field, { label: options.label, help: options.help, children: /* @__PURE__ */ jsx55(
    TiptapEditor,
    {
      value,
      onChange,
      backgroundColor,
      color: textColor,
      colors: options.colors,
      multiline: options.multiline,
      defaultAlign
    }
  ) });
};
var HTMLText = (name, options = {}) => {
  return {
    name,
    options: {
      multiline: true,
      allowHeadings: false,
      default: "",
      ...options
    },
    extraProps: (data) => ({
      backgroundColor: colorToProperty(
        options.backgroundColor && data[options.backgroundColor]
      ),
      textColor: colorToProperty(
        options.textColor && data[options.textColor]
      ),
      defaultAlign: options.defaultAlign ? data[options.defaultAlign] : void 0
    }),
    render: Component5,
    ...defaultFieldProperties()
  };
};

// src/fields/Color.tsx
import { useState as useState17 } from "react";
import * as Popover from "@radix-ui/react-popover";
import styled42 from "@emotion/styled";
import { keyframes as keyframes7 } from "@emotion/react";
import { jsx as jsx56, jsxs as jsxs34 } from "@emotion/react/jsx-runtime";
var Component6 = ({
  value,
  onChange,
  options
}) => {
  const [isOpen, setOpen] = useState17(false);
  const changeHandler = (color) => prevent(() => {
    onChange(color);
    setOpen(false);
  });
  return /* @__PURE__ */ jsx56(Field, { label: options.label, children: /* @__PURE__ */ jsxs34(Popover.Root, { open: isOpen, onOpenChange: () => setOpen((v) => !v), children: [
    /* @__PURE__ */ jsx56(Popover.Trigger, { asChild: true, children: /* @__PURE__ */ jsx56(
      Button6,
      {
        focused: isOpen || void 0,
        color: value || "",
        style: value ? {
          "--ve-selected-color": colorToProperty(value)
        } : void 0
      }
    ) }),
    /* @__PURE__ */ jsxs34(Tooltip2, { side: "top", children: [
      /* @__PURE__ */ jsxs34(
        Palette2,
        {
          style: { "--children": options.colors.length + 1 },
          children: [
            /* @__PURE__ */ jsx56(PaletteItemTransparent, { onClick: prevent(() => onChange(null)) }),
            options.colors.map((color) => /* @__PURE__ */ jsx56(
              PaletteItem2,
              {
                style: { "--ve-color": colorToProperty(color) },
                onClick: changeHandler(color)
              },
              color
            ))
          ]
        }
      ),
      /* @__PURE__ */ jsx56(Arrow2, {})
    ] })
  ] }) });
};
var Color2 = defineField({
  defaultOptions: {
    default: "",
    colors: []
  },
  render: Component6
});
var Button6 = styled42(UnstyledButton)(
  {
    width: "38px",
    height: "38px",
    backgroundColor: "#fff",
    boxShadow: "var(--ve-field-shadow)",
    border: "1px solid var(--ve-field-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "3px",
    "&::before": {
      content: "''",
      display: "block",
      width: "28px",
      height: "28px",
      flex: "none",
      background: "var(--ve-selected-color, red)",
      borderRadius: "2px"
    },
    "&:focus": Styles.FocusState
  },
  (props) => ({
    ...props.focused ? Styles.FocusState : null,
    "&::before": props.color ? null : Styles.Mosaic
  })
);
var In4 = keyframes7({
  from: {
    transform: "translateY(-.2em)",
    opacity: 0
  }
});
var Tooltip2 = styled42(Popover.Content)({
  padding: 3,
  backgroundColor: "white",
  border: "solid 1px rgba(0, 0, 0, 0.1)",
  boxShadow: "rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px",
  borderRadius: "4px",
  animation: `${In4} 0.3s ease-out`
});
var Palette2 = styled42.div({
  flexWrap: "wrap",
  display: "flex",
  width: "calc(27px * var(--children) * 0.5)"
});
var PaletteItem2 = styled42(UnstyledButton)({
  position: "relative",
  backgroundColor: "var(--ve-color)",
  width: "25px",
  height: "25px",
  margin: 1,
  flex: "none",
  zIndex: 2,
  cursor: "pointer",
  borderRadius: "2px",
  border: "1px solid var(--ve-field-border)",
  boxShadow: "var(--ve-field-shadow)",
  "&:hover": {
    zIndex: 3,
    transform: "scale(1.2)",
    borderColor: "var(--ve-primary)",
    outline: "0",
    boxShadow: "0 0 0 0.25rem rgb(23 113 230 / 25%)"
  }
});
var PaletteItemTransparent = styled42(PaletteItem2)({
  ...Styles.Mosaic,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    position: "absolute",
    top: "-9px",
    left: "calc(50% - 1px)",
    content: "''",
    width: "2px",
    height: "40px",
    background: "red",
    transform: "rotate(45deg)"
  }
});
var Arrow2 = styled42(Popover.Arrow)({
  fill: "white"
});

// src/fields/Row.tsx
import styled43 from "@emotion/styled";
import { jsx as jsx57 } from "@emotion/react/jsx-runtime";
var RowComponent = ({ options, children }) => {
  return /* @__PURE__ */ jsx57(Field, { label: options.label, children: /* @__PURE__ */ jsx57(Wrapper16, { columns: options.columns, children }) });
};
var Row = defineFieldGroup({
  defaultOptions: {},
  render: RowComponent
});
var Wrapper16 = styled43(Flex)(
  {
    "& > *": {
      width: "100%"
    }
  },
  ({ columns }) => columns ? {
    display: "grid",
    gridTemplateColumns: columns
  } : {}
);

// src/fields/shared/AlignmentButton.tsx
import styled44 from "@emotion/styled";
import { jsx as jsx58, jsxs as jsxs35 } from "@emotion/react/jsx-runtime";
function AlignmentButton({
  value,
  onChange,
  icon: IconComponent,
  ...props
}) {
  return /* @__PURE__ */ jsxs35(Button7, { children: [
    /* @__PURE__ */ jsx58(
      "input",
      {
        type: "radio",
        value,
        onChange: () => onChange(value),
        title: capitalize(value),
        ...props
      }
    ),
    /* @__PURE__ */ jsx58("div", { children: /* @__PURE__ */ jsx58(IconComponent, {}) })
  ] });
}
var Button7 = styled44.div({
  position: "relative",
  borderRight: "1px solid var(--ve-field-border)",
  "&:last-of-type": {
    border: "none"
  },
  "&:hover": {
    backgroundColor: "var(--ve-hover)"
  },
  "& div": {
    cursor: "pointer",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    transition: ".3s"
  },
  "& input": {
    opacity: 0,
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: 3,
    cursor: "pointer"
  },
  "& input:checked + div": {
    backgroundColor: "var(--ve-primary)",
    color: "#FFF",
    boxShadow: "0 0 0 1px var(--ve-primary)",
    borderRadius: ".2em"
  },
  "& input:focus + div": {
    boxShadow: "0 0 0 1px var(--ve-primary), 0 0 0 0.25rem rgb(23 113 230 / 25%)",
    borderRadius: ".2em"
  }
});

// src/fields/shared/AlignmentButtons.tsx
import styled45 from "@emotion/styled";
var AlignmentButtons = styled45.div({
  display: "inline-flex",
  border: "1px solid var(--ve-field-border)",
  boxShadow: "var(--ve-field-shadow)",
  borderRadius: ".2em"
});

// src/fields/Alignment.tsx
import { jsx as jsx59 } from "@emotion/react/jsx-runtime";
var AlignmentIcons = {
  top: IconAlignTop,
  left: IconAlignLeft,
  bottom: IconAlignBottom,
  right: IconAlignRight
};
var Component7 = ({
  value,
  onChange,
  options
}) => {
  const alignements = [
    "left",
    "right",
    ...options.vertical ? ["top", "bottom"] : []
  ];
  return /* @__PURE__ */ jsx59(Field, { label: options.label, children: /* @__PURE__ */ jsx59(AlignmentButtons, { children: alignements.map((alignment) => /* @__PURE__ */ jsx59(
    AlignmentButton,
    {
      value: alignment,
      checked: value === alignment,
      onChange,
      icon: AlignmentIcons[alignment]
    },
    alignment
  )) }) });
};
var Alignment = defineField({
  defaultOptions: {
    default: "left"
  },
  render: Component7
});

// src/fields/Select.tsx
import { jsx as jsx60 } from "@emotion/react/jsx-runtime";
var Component8 = ({
  value,
  onChange,
  options
}) => {
  const id = useUniqId("selectinput");
  return /* @__PURE__ */ jsx60(
    Field,
    {
      id,
      label: options.label,
      help: options.help,
      options: options.options,
      value,
      onInput: (e) => onChange(e.target.value)
    }
  );
};
var Select2 = defineField({
  defaultOptions: {
    default: "",
    options: []
  },
  render: Component8
});

// src/fields/Number.tsx
import { jsx as jsx61 } from "@emotion/react/jsx-runtime";
var Component9 = ({
  value,
  onChange,
  options
}) => {
  const id = useUniqId("numberinput");
  return /* @__PURE__ */ jsx61(
    Field,
    {
      label: options.label,
      type: "number",
      id,
      value,
      onInput: (e) => onChange(e.target.value),
      help: options.help
    }
  );
};
var Number = defineField({
  defaultOptions: {
    default: ""
  },
  render: Component9
});

// src/fields/Range.tsx
import * as Slider from "@radix-ui/react-slider";
import styled46 from "@emotion/styled";
import { Fragment as Fragment10, jsx as jsx62, jsxs as jsxs36 } from "@emotion/react/jsx-runtime";
var Component10 = ({
  value,
  onChange,
  options
}) => {
  return /* @__PURE__ */ jsx62(
    Field,
    {
      label: /* @__PURE__ */ jsxs36(Fragment10, { children: [
        options.label,
        " ",
        /* @__PURE__ */ jsxs36("small", { children: [
          "(",
          value,
          ")"
        ] })
      ] }),
      help: options.help,
      children: /* @__PURE__ */ jsxs36(
        Root4,
        {
          min: options.min,
          max: options.max,
          value: [value === void 0 ? options.default || 0 : value],
          step: options.step,
          onValueChange: (v) => onChange(v[0] || 0),
          children: [
            /* @__PURE__ */ jsx62(Track2, { children: /* @__PURE__ */ jsx62(TrackSelected, {}) }),
            /* @__PURE__ */ jsx62(Cursor, {})
          ]
        }
      )
    }
  );
};
var Range2 = defineField({
  defaultOptions: {
    default: 0,
    min: 0,
    max: 100,
    step: 1
  },
  render: Component10
});
var Root4 = styled46(Slider.Root)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: "100%",
  height: "20px"
});
var Track2 = styled46(Slider.Track)({
  position: "relative",
  display: "block",
  height: "5px",
  backgroundColor: "var(--ve-field-border)",
  width: "100%",
  borderRadius: "5px"
});
var TrackSelected = styled46(Slider.Range)({
  position: "absolute",
  left: "0",
  height: "100%",
  display: "block",
  borderRadius: "5px",
  backgroundColor: "var(--ve-primary)"
});
var Cursor = styled46(Slider.Thumb)({
  display: "block",
  backgroundColor: "#FFF",
  width: "20px",
  height: "20px",
  borderRadius: "20px",
  boxShadow: "rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px",
  cursor: "pointer",
  border: "1px solid var(--ve-field-border)",
  "&:focus": Styles.FocusState
});

// src/fields/Tabs.tsx
import { cloneElement as cloneElement3 } from "react";
import { jsx as jsx63 } from "@emotion/react/jsx-runtime";
var Component11 = ({
  children,
  options
}) => {
  const childrenForTab = (tab) => {
    return cloneElement3(children, {
      fields: tab.fields
    });
  };
  return /* @__PURE__ */ jsx63(Tabs, { children: options.tabs.map((tab) => /* @__PURE__ */ jsx63(Tabs.Tab, { title: tab.label, children: /* @__PURE__ */ jsx63(Flex, { column: true, children: childrenForTab(tab) }) }, tab.label)) });
};
function Tabs2(...tabs) {
  return {
    ...defaultFieldProperties(),
    group: true,
    options: { tabs },
    render: Component11,
    fields: tabs.reduce(
      (acc, tab) => [...acc, ...tab.fields],
      []
    )
  };
}

// src/fields/DatePicker.tsx
import ReactDatePicker from "react-datepicker";
import { css as css3 } from "@emotion/react";
import { useState as useState18 } from "react";
import styled47 from "@emotion/styled";
import { jsx as jsx64, jsxs as jsxs37 } from "@emotion/react/jsx-runtime";
var DatePickerCss = css3`
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow,
  .react-datepicker__navigation-icon::before {
    border-color: #ccc;
    border-style: solid;
    border-width: 3px 3px 0 0;
    content: '';
    display: block;
    height: 9px;
    position: absolute;
    top: 6px;
    width: 9px;
  }
  .react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle,
  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle {
    margin-left: -4px;
    position: absolute;
    width: 0;
  }
  .react-datepicker-popper[data-placement^='top']
    .react-datepicker__triangle::before,
  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::before,
  .react-datepicker-popper[data-placement^='top']
    .react-datepicker__triangle::after,
  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::after {
    box-sizing: content-box;
    position: absolute;
    border: 8px solid transparent;
    height: 0;
    width: 1px;
    content: '';
    z-index: -1;
    border-width: 8px;
    left: -8px;
  }
  .react-datepicker-popper[data-placement^='top']
    .react-datepicker__triangle::before,
  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::before {
    border-bottom-color: #aeaeae;
  }

  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle {
    top: 0;
    margin-top: -8px;
  }
  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::before,
  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::after {
    border-top: none;
    border-bottom-color: #f0f0f0;
  }
  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::after {
    top: 0;
  }
  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::before {
    top: -1px;
    border-bottom-color: #aeaeae;
  }

  .react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle {
    bottom: 0;
    margin-bottom: -8px;
  }
  .react-datepicker-popper[data-placement^='top']
    .react-datepicker__triangle::before,
  .react-datepicker-popper[data-placement^='top']
    .react-datepicker__triangle::after {
    border-bottom: none;
    border-top-color: #fff;
  }
  .react-datepicker-popper[data-placement^='top']
    .react-datepicker__triangle::after {
    bottom: 0;
  }
  .react-datepicker-popper[data-placement^='top']
    .react-datepicker__triangle::before {
    bottom: -1px;
    border-top-color: #aeaeae;
  }

  .react-datepicker-wrapper {
    display: inline-block;
    padding: 0;
    border: 0;
    width: 100%;
  }

  .react-datepicker {
    font-family: 'Helvetica Neue', helvetica, arial, sans-serif;
    font-size: 0.8rem;
    background-color: #fff;
    color: #000;
    border: 1px solid #aeaeae;
    border-radius: 0.3rem;
    display: inline-block;
    position: relative;
  }

  .react-datepicker--time-only .react-datepicker__triangle {
    left: 35px;
  }
  .react-datepicker--time-only .react-datepicker__time-container {
    border-left: 0;
  }
  .react-datepicker--time-only .react-datepicker__time,
  .react-datepicker--time-only .react-datepicker__time-box {
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }

  .react-datepicker__triangle {
    position: absolute;
    left: 50px;
  }

  .react-datepicker-popper {
    z-index: 1;
  }
  .react-datepicker-popper[data-placement^='bottom'] {
    padding-top: 10px;
  }
  .react-datepicker-popper[data-placement='bottom-end']
    .react-datepicker__triangle,
  .react-datepicker-popper[data-placement='top-end']
    .react-datepicker__triangle {
    left: auto;
    right: 50px;
  }
  .react-datepicker-popper[data-placement^='top'] {
    padding-bottom: 10px;
  }
  .react-datepicker-popper[data-placement^='right'] {
    padding-left: 8px;
  }
  .react-datepicker-popper[data-placement^='right']
    .react-datepicker__triangle {
    left: auto;
    right: 42px;
  }
  .react-datepicker-popper[data-placement^='left'] {
    padding-right: 8px;
  }
  .react-datepicker-popper[data-placement^='left'] .react-datepicker__triangle {
    left: 42px;
    right: auto;
  }

  .react-datepicker__header {
    text-align: center;
    background-color: #f0f0f0;
    border-bottom: 1px solid #aeaeae;
    border-top-left-radius: 0.3rem;
    padding: 8px 0;
    position: relative;
  }
  .react-datepicker__header--time {
    padding-bottom: 8px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .react-datepicker__header--time:not(.react-datepicker__header--time--only) {
    border-top-left-radius: 0;
  }
  .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
    border-top-right-radius: 0.3rem;
  }

  .react-datepicker__year-dropdown-container--select,
  .react-datepicker__month-dropdown-container--select,
  .react-datepicker__month-year-dropdown-container--select,
  .react-datepicker__year-dropdown-container--scroll,
  .react-datepicker__month-dropdown-container--scroll,
  .react-datepicker__month-year-dropdown-container--scroll {
    display: inline-block;
    margin: 0 2px;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    margin-top: 0;
    color: #000;
    font-weight: bold;
    font-size: 0.944rem;
  }

  .react-datepicker-time__header {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .react-datepicker__navigation {
    align-items: center;
    background: none;
    display: flex;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: 2px;
    padding: 0;
    border: none;
    z-index: 1;
    height: 32px;
    width: 32px;
    text-indent: -999em;
    overflow: hidden;
  }
  .react-datepicker__navigation--previous {
    left: 2px;
  }
  .react-datepicker__navigation--next {
    right: 2px;
  }
  .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 85px;
  }
  .react-datepicker__navigation--years {
    position: relative;
    top: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .react-datepicker__navigation--years-previous {
    top: 4px;
  }
  .react-datepicker__navigation--years-upcoming {
    top: -4px;
  }
  .react-datepicker__navigation:hover *::before {
    border-color: #a6a6a6;
  }

  .react-datepicker__navigation-icon {
    position: relative;
    top: -1px;
    font-size: 20px;
    width: 0;
  }
  .react-datepicker__navigation-icon--next {
    left: -2px;
  }
  .react-datepicker__navigation-icon--next::before {
    transform: rotate(45deg);
    left: -7px;
  }
  .react-datepicker__navigation-icon--previous {
    right: -2px;
  }
  .react-datepicker__navigation-icon--previous::before {
    transform: rotate(225deg);
    right: -7px;
  }

  .react-datepicker__month-container {
    float: left;
  }

  .react-datepicker__year {
    margin: 0.4rem;
    text-align: center;
  }
  .react-datepicker__year-wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 180px;
  }
  .react-datepicker__year .react-datepicker__year-text {
    display: inline-block;
    width: 4rem;
    margin: 2px;
  }

  .react-datepicker__month {
    margin: 0.4rem;
    text-align: center;
  }
  .react-datepicker__month .react-datepicker__month-text,
  .react-datepicker__month .react-datepicker__quarter-text {
    display: inline-block;
    width: 4rem;
    margin: 2px;
  }

  .react-datepicker__input-time-container {
    clear: both;
    width: 100%;
    float: left;
    margin: 5px 0 10px 15px;
    text-align: left;
  }
  .react-datepicker__input-time-container .react-datepicker-time__caption {
    display: inline-block;
  }
  .react-datepicker__input-time-container
    .react-datepicker-time__input-container {
    display: inline-block;
  }
  .react-datepicker__input-time-container
    .react-datepicker-time__input-container
    .react-datepicker-time__input {
    display: inline-block;
    margin-left: 10px;
  }
  .react-datepicker__input-time-container
    .react-datepicker-time__input-container
    .react-datepicker-time__input
    input {
    width: auto;
  }
  .react-datepicker__input-time-container
    .react-datepicker-time__input-container
    .react-datepicker-time__input
    input[type='time']::-webkit-inner-spin-button,
  .react-datepicker__input-time-container
    .react-datepicker-time__input-container
    .react-datepicker-time__input
    input[type='time']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .react-datepicker__input-time-container
    .react-datepicker-time__input-container
    .react-datepicker-time__input
    input[type='time'] {
    -moz-appearance: textfield;
  }
  .react-datepicker__input-time-container
    .react-datepicker-time__input-container
    .react-datepicker-time__delimiter {
    margin-left: 5px;
    display: inline-block;
  }

  .react-datepicker__time-container {
    float: right;
    border-left: 1px solid #aeaeae;
    width: 85px;
  }
  .react-datepicker__time-container--with-today-button {
    display: inline;
    border: 1px solid #aeaeae;
    border-radius: 0.3rem;
    position: absolute;
    right: -72px;
    top: 0;
  }
  .react-datepicker__time-container .react-datepicker__time {
    position: relative;
    background: white;
    border-bottom-right-radius: 0.3rem;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box {
    width: 85px;
    overflow-x: hidden;
    margin: 0 auto;
    text-align: center;
    border-bottom-right-radius: 0.3rem;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list {
    list-style: none;
    margin: 0;
    height: calc(195px + (1.7rem / 2));
    overflow-y: scroll;
    padding-right: 0;
    padding-left: 0;
    width: 100%;
    box-sizing: content-box;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    height: 30px;
    padding: 5px 10px;
    white-space: nowrap;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: #216ba5;
    color: white;
    font-weight: bold;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected:hover {
    background-color: #216ba5;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--disabled {
    color: #ccc;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--disabled:hover {
    cursor: default;
    background-color: transparent;
  }

  .react-datepicker__week-number {
    color: #ccc;
    display: inline-block;
    width: 1.7rem;
    line-height: 1.7rem;
    text-align: center;
    margin: 0.166rem;
  }
  .react-datepicker__week-number.react-datepicker__week-number--clickable {
    cursor: pointer;
  }
  .react-datepicker__week-number.react-datepicker__week-number--clickable:hover {
    border-radius: 0.3rem;
    background-color: #f0f0f0;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    white-space: nowrap;
  }

  .react-datepicker__day-names {
    margin-bottom: -8px;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: #000;
    display: inline-block;
    width: 1.7rem;
    line-height: 1.7rem;
    text-align: center;
    margin: 0.166rem;
  }

  .react-datepicker__month--selected,
  .react-datepicker__month--in-selecting-range,
  .react-datepicker__month--in-range,
  .react-datepicker__quarter--selected,
  .react-datepicker__quarter--in-selecting-range,
  .react-datepicker__quarter--in-range {
    border-radius: 0.3rem;
    background-color: #216ba5;
    color: #fff;
  }
  .react-datepicker__month--selected:hover,
  .react-datepicker__month--in-selecting-range:hover,
  .react-datepicker__month--in-range:hover,
  .react-datepicker__quarter--selected:hover,
  .react-datepicker__quarter--in-selecting-range:hover,
  .react-datepicker__quarter--in-range:hover {
    background-color: #1d5d90;
  }
  .react-datepicker__month--disabled,
  .react-datepicker__quarter--disabled {
    color: #ccc;
    pointer-events: none;
  }
  .react-datepicker__month--disabled:hover,
  .react-datepicker__quarter--disabled:hover {
    cursor: default;
    background-color: transparent;
  }

  .react-datepicker__day,
  .react-datepicker__month-text,
  .react-datepicker__quarter-text,
  .react-datepicker__year-text {
    cursor: pointer;
  }
  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover,
  .react-datepicker__year-text:hover {
    border-radius: 0.3rem;
    background-color: #f0f0f0;
  }
  .react-datepicker__day--today,
  .react-datepicker__month-text--today,
  .react-datepicker__quarter-text--today,
  .react-datepicker__year-text--today {
    font-weight: bold;
  }
  .react-datepicker__day--highlighted,
  .react-datepicker__month-text--highlighted,
  .react-datepicker__quarter-text--highlighted,
  .react-datepicker__year-text--highlighted {
    border-radius: 0.3rem;
    background-color: #3dcc4a;
    color: #fff;
  }
  .react-datepicker__day--highlighted:hover,
  .react-datepicker__month-text--highlighted:hover,
  .react-datepicker__quarter-text--highlighted:hover,
  .react-datepicker__year-text--highlighted:hover {
    background-color: #32be3f;
  }
  .react-datepicker__day--highlighted-custom-1,
  .react-datepicker__month-text--highlighted-custom-1,
  .react-datepicker__quarter-text--highlighted-custom-1,
  .react-datepicker__year-text--highlighted-custom-1 {
    color: magenta;
  }
  .react-datepicker__day--highlighted-custom-2,
  .react-datepicker__month-text--highlighted-custom-2,
  .react-datepicker__quarter-text--highlighted-custom-2,
  .react-datepicker__year-text--highlighted-custom-2 {
    color: green;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    border-radius: 0.3rem;
    background-color: #216ba5;
    color: #fff;
  }
  .react-datepicker__day--selected:hover,
  .react-datepicker__day--in-selecting-range:hover,
  .react-datepicker__day--in-range:hover,
  .react-datepicker__month-text--selected:hover,
  .react-datepicker__month-text--in-selecting-range:hover,
  .react-datepicker__month-text--in-range:hover,
  .react-datepicker__quarter-text--selected:hover,
  .react-datepicker__quarter-text--in-selecting-range:hover,
  .react-datepicker__quarter-text--in-range:hover,
  .react-datepicker__year-text--selected:hover,
  .react-datepicker__year-text--in-selecting-range:hover,
  .react-datepicker__year-text--in-range:hover {
    background-color: #1d5d90;
  }
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    border-radius: 0.3rem;
    background-color: #2a87d0;
    color: #fff;
  }
  .react-datepicker__day--keyboard-selected:hover,
  .react-datepicker__month-text--keyboard-selected:hover,
  .react-datepicker__quarter-text--keyboard-selected:hover,
  .react-datepicker__year-text--keyboard-selected:hover {
    background-color: #1d5d90;
  }
  .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range),
  .react-datepicker__month-text--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range),
  .react-datepicker__quarter-text--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range),
  .react-datepicker__year-text--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range) {
    background-color: rgba(33, 107, 165, 0.5);
  }
  .react-datepicker__month--selecting-range
    .react-datepicker__day--in-range:not(.react-datepicker__day--in-selecting-range, .react-datepicker__month-text--in-selecting-range, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__year-text--in-selecting-range),
  .react-datepicker__month--selecting-range
    .react-datepicker__month-text--in-range:not(.react-datepicker__day--in-selecting-range, .react-datepicker__month-text--in-selecting-range, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__year-text--in-selecting-range),
  .react-datepicker__month--selecting-range
    .react-datepicker__quarter-text--in-range:not(.react-datepicker__day--in-selecting-range, .react-datepicker__month-text--in-selecting-range, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__year-text--in-selecting-range),
  .react-datepicker__month--selecting-range
    .react-datepicker__year-text--in-range:not(.react-datepicker__day--in-selecting-range, .react-datepicker__month-text--in-selecting-range, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__year-text--in-selecting-range) {
    background-color: #f0f0f0;
    color: #000;
  }
  .react-datepicker__day--disabled,
  .react-datepicker__month-text--disabled,
  .react-datepicker__quarter-text--disabled,
  .react-datepicker__year-text--disabled {
    cursor: default;
    color: #ccc;
  }
  .react-datepicker__day--disabled:hover,
  .react-datepicker__month-text--disabled:hover,
  .react-datepicker__quarter-text--disabled:hover,
  .react-datepicker__year-text--disabled:hover {
    background-color: transparent;
  }

  .react-datepicker__month-text.react-datepicker__month--selected:hover,
  .react-datepicker__month-text.react-datepicker__month--in-range:hover,
  .react-datepicker__month-text.react-datepicker__quarter--selected:hover,
  .react-datepicker__month-text.react-datepicker__quarter--in-range:hover,
  .react-datepicker__quarter-text.react-datepicker__month--selected:hover,
  .react-datepicker__quarter-text.react-datepicker__month--in-range:hover,
  .react-datepicker__quarter-text.react-datepicker__quarter--selected:hover,
  .react-datepicker__quarter-text.react-datepicker__quarter--in-range:hover {
    background-color: #216ba5;
  }
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover {
    background-color: #f0f0f0;
  }

  .react-datepicker__input-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .react-datepicker__year-read-view,
  .react-datepicker__month-read-view,
  .react-datepicker__month-year-read-view {
    border: 1px solid transparent;
    border-radius: 0.3rem;
    position: relative;
  }
  .react-datepicker__year-read-view:hover,
  .react-datepicker__month-read-view:hover,
  .react-datepicker__month-year-read-view:hover {
    cursor: pointer;
  }
  .react-datepicker__year-read-view:hover
    .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__year-read-view:hover
    .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-read-view:hover
    .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view:hover
    .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view:hover
    .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-year-read-view:hover
    .react-datepicker__month-read-view--down-arrow {
    border-top-color: #b3b3b3;
  }
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    transform: rotate(135deg);
    right: -16px;
    top: 0;
  }

  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown,
  .react-datepicker__month-year-dropdown {
    background-color: #f0f0f0;
    position: absolute;
    width: 50%;
    left: 25%;
    top: 30px;
    z-index: 1;
    text-align: center;
    border-radius: 0.3rem;
    border: 1px solid #aeaeae;
  }
  .react-datepicker__year-dropdown:hover,
  .react-datepicker__month-dropdown:hover,
  .react-datepicker__month-year-dropdown:hover {
    cursor: pointer;
  }
  .react-datepicker__year-dropdown--scrollable,
  .react-datepicker__month-dropdown--scrollable,
  .react-datepicker__month-year-dropdown--scrollable {
    height: 150px;
    overflow-y: scroll;
  }

  .react-datepicker__year-option,
  .react-datepicker__month-option,
  .react-datepicker__month-year-option {
    line-height: 20px;
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .react-datepicker__year-option:first-of-type,
  .react-datepicker__month-option:first-of-type,
  .react-datepicker__month-year-option:first-of-type {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }
  .react-datepicker__year-option:last-of-type,
  .react-datepicker__month-option:last-of-type,
  .react-datepicker__month-year-option:last-of-type {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
  .react-datepicker__year-option:hover,
  .react-datepicker__month-option:hover,
  .react-datepicker__month-year-option:hover {
    background-color: #ccc;
  }
  .react-datepicker__year-option:hover
    .react-datepicker__navigation--years-upcoming,
  .react-datepicker__month-option:hover
    .react-datepicker__navigation--years-upcoming,
  .react-datepicker__month-year-option:hover
    .react-datepicker__navigation--years-upcoming {
    border-bottom-color: #b3b3b3;
  }
  .react-datepicker__year-option:hover
    .react-datepicker__navigation--years-previous,
  .react-datepicker__month-option:hover
    .react-datepicker__navigation--years-previous,
  .react-datepicker__month-year-option:hover
    .react-datepicker__navigation--years-previous {
    border-top-color: #b3b3b3;
  }
  .react-datepicker__year-option--selected,
  .react-datepicker__month-option--selected,
  .react-datepicker__month-year-option--selected {
    position: absolute;
    left: 15px;
  }

  .react-datepicker__close-icon {
    cursor: pointer;
    background-color: transparent;
    border: 0;
    outline: 0;
    padding: 0 6px 0 0;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: table-cell;
    vertical-align: middle;
  }
  .react-datepicker__close-icon::after {
    cursor: pointer;
    background-color: #216ba5;
    color: #fff;
    border-radius: 50%;
    height: 16px;
    width: 16px;
    padding: 2px;
    font-size: 12px;
    line-height: 1;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    content: '×';
  }

  .react-datepicker__today-button {
    background: #f0f0f0;
    border-top: 1px solid #aeaeae;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    padding: 5px 0;
    clear: left;
  }

  .react-datepicker__portal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    display: flex;
    z-index: 2147483647;
  }
  .react-datepicker__portal .react-datepicker__day-name,
  .react-datepicker__portal .react-datepicker__day,
  .react-datepicker__portal .react-datepicker__time-name {
    width: 3rem;
    line-height: 3rem;
  }
  @media (max-width: 400px), (max-height: 550px) {
    .react-datepicker__portal .react-datepicker__day-name,
    .react-datepicker__portal .react-datepicker__day,
    .react-datepicker__portal .react-datepicker__time-name {
      width: 2rem;
      line-height: 2rem;
    }
  }
  .react-datepicker__portal .react-datepicker__current-month,
  .react-datepicker__portal .react-datepicker-time__header {
    font-size: 1.44rem;
  }
`;
var Component12 = ({
  value,
  onChange,
  options
}) => {
  const date = value ? new Date(value * 1e3) : null;
  const [open, setOpen] = useState18(false);
  const formattedDate = date ? new Intl.DateTimeFormat(void 0, {
    dateStyle: "long",
    timeStyle: options.time ? "short" : void 0
  }).format(date) : "";
  const handleChange = (date2) => {
    onChange(date2.getTime() / 1e3);
    if (!options.time) {
      setOpen(false);
    }
  };
  const ReactDatePickerComponent = typeof ReactDatePicker === "function" ? ReactDatePicker : ReactDatePicker.default;
  const id = useUniqId("datepickerinput");
  return /* @__PURE__ */ jsx64(
    Field,
    {
      id,
      label: options.label,
      help: options.help,
      icon: /* @__PURE__ */ jsx64(Button8, { onClick: prevent(() => setOpen(true)), children: /* @__PURE__ */ jsx64(IconCalendar, { size: 16 }) }),
      children: /* @__PURE__ */ jsxs37("div", { css: DatePickerCss, children: [
        /* @__PURE__ */ jsx64(
          Input,
          {
            id,
            onFocus: () => setOpen(true),
            value: formattedDate,
            readOnly: true
          }
        ),
        open && /* @__PURE__ */ jsx64("div", { css: { position: "absolute", zIndex: 4 }, children: /* @__PURE__ */ jsx64(
          ReactDatePickerComponent,
          {
            selected: date,
            showTimeInput: options.time,
            inline: true,
            onChange: handleChange,
            onClickOutside: () => setOpen(false)
          }
        ) })
      ] })
    }
  );
};
var Button8 = styled47(ButtonIcon)({
  width: "32px",
  height: "32px",
  color: "var(--ve-color-light)"
});
var DatePicker = defineField({
  defaultOptions: {
    default: "",
    time: false
  },
  render: Component12
});

// src/fields/TextAlign.tsx
import { jsx as jsx65 } from "@emotion/react/jsx-runtime";
var AlignmentIcons2 = {
  left: IconTextLeft,
  center: IconTextCenter,
  right: IconTextRight
};
var Component13 = ({
  value,
  onChange,
  options
}) => {
  const alignements = Object.keys(AlignmentIcons2);
  const id = useUniqId();
  return /* @__PURE__ */ jsx65(Field, { label: options.label, children: /* @__PURE__ */ jsx65(AlignmentButtons, { children: alignements.map((alignment) => /* @__PURE__ */ jsx65(
    AlignmentButton,
    {
      name: id,
      value: alignment,
      checked: value === alignment,
      onChange,
      icon: AlignmentIcons2[alignment]
    },
    alignment
  )) }) });
};
var TextAlign2 = defineField({
  defaultOptions: {
    default: "left"
  },
  render: Component13
});

// src/langs/fr.ts
var Translations2 = {
  copyPage: "Copier le code de la page",
  deleteComponent: "Supprimer le bloc",
  copyComponent: "Copier le  bloc",
  searchComponent: "Rechercher un bloc",
  copySuccess: "Le code a bi\xE9n \xE9t\xE9 copi\xE9",
  copyInstructions: "vous pouvez le coller sur une autre page (CTRL + V)",
  addComponent: "Ajouter un bloc",
  responsiveView: "Vue responsive",
  addItem: "Ajouter un \xE9l\xE9ment",
  deleteItem: "Supprimer l'\xE9l\xE9ment",
  rollback: "R\xE9tablir",
  deleteItemConfirm: "Le bloc a bien \xE9t\xE9 supprim\xE9",
  unknownComponent: "Bloc inconnu",
  save: "Sauvegarder",
  close: "Fermer",
  poweredBy: "Propuls\xE9 par",
  noContent: `Vous n'avez pas encore de contenu`,
  useTemplate: "Utilisez un template"
};

// src/VisualEditor.tsx
import { jsx as jsx66, jsxs as jsxs38 } from "@emotion/react/jsx-runtime";
var components = {};
var templates = [];
var _VisualEditor = class _VisualEditor {
  constructor(options = {}) {
    _VisualEditor.i18n = options.lang ?? Translations;
    _VisualEditor.postMessagePreview = options.postMessagePreview ?? false;
  }
  registerComponent(name, definition) {
    components[name] = { label: "title", ...definition };
  }
  registerTemplate(template) {
    templates.push(template);
  }
  defineElement(elementName = "visual-editor") {
    class VisualEditorElement extends HTMLElement {
      constructor() {
        super(...arguments);
        __publicField(this, "_mounted", false);
        __publicField(this, "_data", null);
        __publicField(this, "_value", "");
      }
      static get observedAttributes() {
        return ["hidden", "value"];
      }
      get value() {
        return this._value;
      }
      set value(v) {
        if (v === this._value) {
          return;
        }
        this._value = v;
        this._data = null;
        this.render();
      }
      connectedCallback() {
        this._value = this.getAttribute("value") || "[]";
        this.render();
        this._mounted = true;
      }
      attributeChangedCallback(name, oldValue, newValue) {
        if (!this._mounted) {
          return false;
        }
        if (name === "value") {
          if (newValue === this._value) {
            return;
          }
          this._value = newValue;
        }
        this.render();
      }
      disconnectedCallback() {
        this._mounted = false;
      }
      parseValue(value) {
        if (this._data === null) {
          try {
            const json = JSON.parse(value);
            this._data = indexify(json).map((value2) => {
              return fillDefaults(value2, components[value2._name]?.fields ?? []);
            });
          } catch (e) {
            console.error("Impossible de parser les donn\xE9es", value, e);
            alert("Impossible de parser les donn\xE9es de l'\xE9diteur visuel");
            this._data = [];
          }
        }
        return this._data;
      }
      render() {
        const data = this.parseValue(this._value);
        const hiddenCategories = this.getAttribute("hidden-categories")?.split(";") ?? [];
        createRoot3(this).render(
          /* @__PURE__ */ jsx66(
            StoreProvider,
            {
              data,
              definitions: components,
              templates,
              hiddenCategories,
              rootElement: this,
              insertPosition: this.getAttribute("insertPosition") ?? "start" /* Start */,
              children: /* @__PURE__ */ jsx66(
                VisualEditorComponent,
                {
                  element: this,
                  value: data,
                  previewUrl: this.getAttribute("preview") ?? "",
                  iconsUrl: this.getAttribute("iconsUrl") ?? "/",
                  name: this.getAttribute("name") ?? "",
                  visible: this.getAttribute("hidden") === null,
                  onChange: (value) => {
                    if (this._value === value) {
                      return;
                    }
                    this._value = value;
                    this.dispatchEvent(
                      new CustomEvent("change", {
                        detail: value
                      })
                    );
                  }
                }
              )
            }
          )
        );
      }
    }
    __publicField(VisualEditorElement, "changeEventName", "change");
    customElements.define(elementName, VisualEditorElement);
  }
};
__publicField(_VisualEditor, "i18n", Translations);
__publicField(_VisualEditor, "postMessagePreview", false);
var VisualEditor = _VisualEditor;
function VisualEditorComponent({
  value,
  previewUrl,
  name,
  element,
  iconsUrl,
  visible: visibleProps,
  onChange
}) {
  const skipNextChange = useRef13(true);
  const updateData = useUpdateData();
  const data = useData();
  const visible = useStateDelayed(visibleProps);
  const handleClose = () => {
    element.dispatchEvent(new Event("close"));
  };
  const doNothing = () => null;
  const cleanedData = useMemo9(() => stringifyFields(data), [data]);
  useUpdateEffect(() => {
    skipNextChange.current = true;
    updateData(value);
  }, [value]);
  useClipboardPaste(visible);
  useEffect16(() => {
    if (skipNextChange.current) {
      skipNextChange.current = false;
    } else {
      onChange(cleanedData);
    }
  }, [cleanedData]);
  const div = useRef13(null);
  useStopPropagation(div, ["change", "close"]);
  if (!visible) {
    return /* @__PURE__ */ jsx66("textarea", { hidden: true, name, value: cleanedData, onChange: doNothing });
  }
  return /* @__PURE__ */ jsxs38("div", { ref: div, children: [
    /* @__PURE__ */ jsx66(BaseStyles, { children: /* @__PURE__ */ jsx66(
      Layout,
      {
        data,
        onClose: handleClose,
        previewUrl,
        iconsUrl
      }
    ) }),
    /* @__PURE__ */ jsx66("textarea", { hidden: true, name, value: cleanedData, onChange: doNothing })
  ] });
}
export {
  AddButton,
  Alignment,
  BaseStyles,
  Checkbox,
  Color2 as Color,
  DatePicker,
  Translations as EN,
  Translations2 as FR,
  Field,
  FieldsRenderer,
  HTMLText,
  ImageUrl,
  Number,
  PreviewModes,
  PreviewWrapper2 as PreviewWrapper,
  Range2 as Range,
  React10 as React,
  Repeater,
  Row,
  Select2 as Select,
  StoreProvider,
  Tabs2 as Tabs,
  Text,
  TextAlign2 as TextAlign,
  VisualEditor,
  VisualEditorComponent,
  defineField,
  defineFieldGroup,
  store,
  useAddBlock,
  useBlocSelectionVisible,
  useData,
  useDefinitions,
  useFieldDefinitions,
  useFieldFocused,
  useFocusIndex,
  useHiddenCategories,
  useInsertData,
  usePreviewMode,
  useRemoveBloc,
  useRollbackMessage,
  useRootElement,
  useSetBlockIndex,
  useSetData,
  useSetFocusIndex,
  useSetSidebarWidth,
  useSidebarWidth,
  useTemplates,
  useTogglePreviewMode,
  useUpdateData
};
