function formatVolume(volume: number) {
  return volume < 1000 ? `${volume} mL` : `${volume / 1000} L`;
}

function formatDeposit(deposit: number) {
  return (deposit / 100).toFixed(2);
}

function formatPackaging(packaging: string) {
  return packaging === "pet"
    ? packaging.toUpperCase()
    : packaging.charAt(0).toUpperCase() + packaging.slice(1);
}

function formatRegisteredAt(registeredAt: string) {
  return new Date(registeredAt).toLocaleDateString();
}

export { formatVolume, formatDeposit, formatPackaging, formatRegisteredAt };
