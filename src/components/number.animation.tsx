"use client";

import AnimatedNumbers from "react-animated-numbers";

export type NumberAnimationTextProps = {
  number: number;
  className?: string;
};

export function NumberAnimationText(props: NumberAnimationTextProps) {
  const { number, className } = props;

  return (
    <AnimatedNumbers
      key={`Num-${number}`}
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
