import { headers } from "next/headers";
import { UserAgentProvider } from "@/components/providers/userAgentProvider";
import { UserAgent } from "@/views/userAgent";

const UserAgentRoot = () => {
  const userAgent = headers().get("user-agent") || undefined;

  return (
    <UserAgentProvider userAgent={userAgent}>
      <UserAgent />
    </UserAgentProvider>
  );
}

export default UserAgentRoot;
