import ContinueLogo from "../../gui/ContinueLogo";
// import QuickStartSubmitButton from "../components/QuickStartSubmitButton";

function OnboardingQuickstartTab() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="xs:px-0 flex w-full max-w-full flex-col items-center justify-center px-4 text-center">
        <div className="xs:flex hidden">
          <ContinueLogo height={75} />
        </div>

        <p className="xs:w-3/4 w-full text-sm">
          Welcome to Destra Genesis AI
        </p>

        {/* <p className="xs:w-3/4 w-full text-sm">
          To prevent abuse, we'll ask you to sign in to GitHub.
        </p> */}

        {/* <QuickStartSubmitButton /> */}
      </div>
    </div>
  );
}

export default OnboardingQuickstartTab;
