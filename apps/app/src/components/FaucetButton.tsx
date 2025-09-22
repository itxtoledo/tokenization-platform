import { Button } from "./ui/button";

export function FaucetButton() {
  const handleFaucetClick = () => {
    window.open("https://www.bnbchain.org/en/testnet-faucet", "_blank");
  };

  return (
    <Button 
      onClick={handleFaucetClick}
      variant="outline"
      className="ml-4"
    >
      Get Test BNB
    </Button>
  );
}