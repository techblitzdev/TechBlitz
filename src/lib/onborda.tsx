export const steps: any = [
    // Example steps
    {
      icon: <>👋</>,
      title: "Welcome to Onborda!",
      content: <>Welcome to Onborda, an onboarding flow for Next.js!</>,
      selector: "#onborda-step1",
      side: "top",
      showControls: true,
      pointerPadding: -1,
      pointerRadius: 24,
    },
    {
      icon: <>🪄</>,
      title: "It's like magic!",
      content: (
        <>
          Onborda uses <b>framer-motion</b> to handle animations and{" "}
          <b>reactour</b> to handle the onboarding flow.
        </>
      ),
      selector: "#onborda-step2",
      side: "top",
      showControls: true,
      pointerPadding: -1,
      pointerRadius: 24,
    },
    {
      icon: <>🎩</>,
      title: "Works across routes!",
      content: (
        <>
          Onborda uses <b>framer-motion</b> to handle animations and{" "}
          <b>reactour</b> to handle the onboarding flow.
        </>
      ),
      selector: "#onborda-step3",
      side: "top",
      showControls: true,
      pointerPadding: -1,
      pointerRadius: 24,
    },
    {
      icon: <>🌀</>,
      title: "Customize your steps",
      content: <>Customize each step of your onboarding process!</>,
      selector: "#onborda-step4",
      side: "top",
      showControls: true,
      pointerPadding: -1,
      pointerRadius: 24,
    },
    {
      icon: <>👉</>,
      title: "Custom pointers",
      content: (
        <>
          Full control over your pointer content, fully compatible with custom
          components like <b>shadcn/ui</b>.
        </>
      ),
      selector: "#onborda-step5",
      side: "top",
      showControls: true,
      pointerPadding: -1,
      pointerRadius: 24,
    },
    {
      icon: <>⭐️</>,
      title: "Github",
      content: <>Star this repo!</>,
      selector: "#onborda-step6",
      side: "top",
      showControls: true,
      pointerPadding: -1,
      pointerRadius: 24,
      nextRoute: "/page-two",
    },
    {
      icon: <>🚀</>,
      title: "Change routes",
      content: <>Onborda even works across routes!</>,
      selector: "#onborda-step7",
      side: "bottom",
      showControls: true,
      pointerPadding: 5,
      pointerRadius: 10,
      prevRoute: "/",
    },
  ];