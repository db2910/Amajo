"use client";

import { ArrowRight, Check, Leaf } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Toaster } from "@/components/ui/sonner";
import { Grid, Stack } from "@/components/layout/primitives";

export function ComponentPreview() {
  return (
    <Stack className="gap-12">
      <Toaster />
      <section aria-labelledby="actions-heading">
        <h2 id="actions-heading" className="section-title mb-6">
          Purposeful actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              toast("A foundation notification", {
                description: "A preview of shared interface feedback.",
              })
            }
          >
            Preview notification <ArrowRight aria-hidden="true" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast("Secondary action preview")}
          >
            Secondary action
          </Button>
          <Button
            variant="outline"
            onClick={() => toast("Outline action preview")}
          >
            Outline action
          </Button>
          <Button variant="ghost" onClick={() => toast("Quiet action preview")}>
            Quiet action
          </Button>
          <Button disabled>Unavailable action</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge>Primary label</Badge>
          <Badge variant="secondary">
            <Leaf aria-hidden="true" /> Conservation
          </Badge>
          <Badge variant="outline">Editorial label</Badge>
        </div>
      </section>

      <section aria-labelledby="forms-heading">
        <h2 id="forms-heading" className="section-title mb-3">
          Considered details
        </h2>
        <p className="mb-8 text-muted-foreground">
          Component examples only. These controls do not save or send
          information.
        </p>
        <Grid className="lg:grid-cols-2">
          <Field
            id="preview-name"
            label="Full name"
            description="Example of an accessible text field."
          >
            <Input
              id="preview-name"
              placeholder="Your name"
              autoComplete="off"
              aria-describedby="preview-name-description"
            />
          </Field>
          <Field id="preview-region" label="Region">
            <Select defaultValue="rwanda">
              <SelectTrigger id="preview-region" className="w-full">
                <SelectValue placeholder="Choose a region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rwanda">Rwanda</SelectItem>
                <SelectItem value="uganda">Uganda</SelectItem>
                <SelectItem value="kenya">Kenya</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field
            id="preview-notes"
            label="Travel notes"
            className="md:col-span-2"
          >
            <Textarea
              id="preview-notes"
              placeholder="A little room for the details…"
            />
          </Field>
          <div>
            <div className="flex min-h-11 items-center gap-3">
              <Checkbox id="preview-forest" />
              <Label htmlFor="preview-forest">Include forest experiences</Label>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Checkbox example
            </p>
          </div>
          <fieldset>
            <legend
              id="preview-pace-label"
              className="mb-3 text-sm font-medium"
            >
              Travel pace
            </legend>
            <RadioGroup
              aria-labelledby="preview-pace-label"
              defaultValue="balanced"
              className="flex flex-wrap gap-5"
            >
              <div className="flex min-h-11 items-center gap-2">
                <RadioGroupItem id="pace-balanced" value="balanced" />
                <Label htmlFor="pace-balanced">Balanced</Label>
              </div>
              <div className="flex min-h-11 items-center gap-2">
                <RadioGroupItem id="pace-unhurried" value="unhurried" />
                <Label htmlFor="pace-unhurried">Unhurried</Label>
              </div>
            </RadioGroup>
          </fieldset>
          <Field
            id="preview-invalid"
            label="Validation example"
            error="Enter an email address in a valid format."
          >
            <Input
              id="preview-invalid"
              aria-invalid="true"
              aria-describedby="preview-invalid-error"
              defaultValue="example"
            />
          </Field>
          <Field id="preview-disabled" label="Unavailable field">
            <Input id="preview-disabled" disabled placeholder="Unavailable" />
          </Field>
        </Grid>
      </section>

      <section aria-labelledby="panels-heading">
        <h2 id="panels-heading" className="section-title mb-6">
          Space to focus
        </h2>
        <Grid className="lg:grid-cols-2">
          <Card>
            <CardHeader>
              <span className="eyebrow text-primary">Shared card</span>
              <CardTitle className="text-2xl">
                A quieter kind of luxury
              </CardTitle>
              <CardDescription>
                Warm surfaces, generous spacing and a clear reading order.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Reusable foundations for future destinations, itineraries and
                editorial stories.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">A moment of clarity</CardTitle>
              <CardDescription>
                Dialogs and drawers contain focus, close with Escape and return
                focus to their trigger.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Preview dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>AMAJO foundation dialog</DialogTitle>
                    <DialogDescription>
                      A focused space for future decisions. This preview does
                      not change any data.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button>
                        Close preview <Check aria-hidden="true" />
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Preview drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>AMAJO foundation drawer</DrawerTitle>
                    <DrawerDescription>
                      A responsive side panel for future navigation and
                      supporting details.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 text-sm text-muted-foreground">
                    This layout example contains no customer or administrative
                    data.
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button>Close preview</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </CardContent>
          </Card>
          <EmptyState title="Room for what comes next">
            An honest empty state gives context without inventing content.
          </EmptyState>
          <div
            aria-label="Loading appearance example"
            className="rounded-lg border bg-card p-6"
          >
            <p className="mb-4 text-sm text-muted-foreground">
              Skeleton appearance example
            </p>
            <div aria-hidden="true" className="space-y-3">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </Grid>
      </section>
    </Stack>
  );
}
