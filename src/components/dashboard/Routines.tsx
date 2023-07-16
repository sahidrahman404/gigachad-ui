import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { RoutinesQuery } from "../../../__generated__/RoutinesQuery.graphql";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useRouter } from "next/router";

export const routinesQuery = graphql`
  query RoutinesQuery($input: ID) {
    routines(where: { userID: $input }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

type RoutinesProps = {
  routinesQueryRef: PreloadedQuery<RoutinesQuery>;
};

export default function Routines({ routinesQueryRef }: RoutinesProps) {
  const data = usePreloadedQuery(routinesQuery, routinesQueryRef);

  if (data.routines.edges && data.routines.edges.length > 0) {
    return (
      <ol>
        {data.routines.edges.map((routine) => {
          if (routine && routine.node) {
            return (
              <RoutineCard id={routine.node.id} name={routine.node.name} />
            );
          }
          return null;
        })}
      </ol>
    );
  }

  return null;
}

type RoutineCardProps = {
  id: string;
  name: string;
};

function RoutineCard({ id, name }: RoutineCardProps) {
  const router = useRouter();
  return (
    <Card key={id}>
      <CardHeader className="flex flex-row">
        <CardTitle className="items-center">{name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto">
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Delete Routine</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push(`/dashboard/routine/${id}`);
              }}
            >
              Edit Routine
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardFooter>
        <Button disabled={true}>Start Routine</Button>
      </CardFooter>
    </Card>
  );
}
