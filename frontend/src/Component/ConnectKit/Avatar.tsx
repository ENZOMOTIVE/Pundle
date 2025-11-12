import { Types } from "connectkit";
import { FaWallet } from "react-icons/fa"; // Wallet icon from FontAwesome


const MyCustomAvatar = ({ ensImage, ensName, size, radius }: Types.CustomAvatarProps) => {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: radius,
        height: size,
        width: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5", // fallback background
      }}
    >
      {ensImage ? (
        <img
          src={ensImage}
          alt={ensName ?? "User"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <FaWallet size={size * 0.6} color="#627eea" /> // Ethereum icon as fallback
      )}
    </div>
  );
};

export default MyCustomAvatar;
