"use client";

import AnimatedNumbers from "react-animated-numbers";

export type NumberAnimationTextProps = {
  uniqueKey?: string | undefined;
  number: number;
  className?: string;
};

export function NumberAnimationText(props: NumberAnimationTextProps) {
  const { uniqueKey, number, className } = props;

  const keyValue = `AnimationText-${uniqueKey}-${number}`;

  return (
    <AnimatedNumbers
      key={keyValue}
      includeComma={true}
      className={className}
      // transitions={(index) => ({
      //   type: "spring",
      //   // duration: index + 0.0,
      // })}
      animateToNumber={number}
      // fontStyle={{
      //   fontSize: 40,
      //   color: "red",
      // }}
    />
  );
}
