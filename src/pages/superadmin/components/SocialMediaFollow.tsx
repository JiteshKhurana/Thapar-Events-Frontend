import { TableCell } from "@/components/ui/table";

const SocialMediaFollow = ({
  platform,
  label,
}: {
  platform: string;
  label: string;
}) => {
  return (
    <>
      {platform === "" ? (
        <TableCell></TableCell>
      ) : (
        <TableCell>
          <a
            target="_blank"
            className="cursor-pointer text-md dark:bg-white bg-black dark:text-black text-white p-2 rounded-md w-24 font-medium "
            href={platform}
          >
            {label}
          </a>
        </TableCell>
      )}
    </>
  );
};

export default SocialMediaFollow;
