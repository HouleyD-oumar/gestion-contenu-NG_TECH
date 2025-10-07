"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store/store";
import { setFilters } from "../../store/slices/contentSlice";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Card, CardHeader, CardTitle } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";

export default function Filters() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state: RootState) => state.content);
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { id: "all", label: "Tous", color: "bg-primary" },
    { id: "technology", label: "Technologie", color: "bg-blue-500" },
    { id: "design", label: "Design", color: "bg-purple-500" },
    { id: "business", label: "Business", color: "bg-green-500" },
    { id: "lifestyle", label: "Lifestyle", color: "bg-pink-500" },
    { id: "education", label: "Éducation", color: "bg-orange-500" },
  ];

  const handleTagChange = (value: string) => {
    const tags = value ? value.split(",").map(tag => tag.trim()) : [];
    dispatch(setFilters({ tags }));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setFilters({ category: category === "all" ? undefined : category }));
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = filters.tags.filter(tag => tag !== tagToRemove);
    dispatch(setFilters({ tags: newTags }));
  };

  const clearAllFilters = () => {
    dispatch(setFilters({ tags: [], category: undefined }));
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <CardTitle className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <span>Filtres de recherche</span>
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CardTitle>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-6 pt-4">
            {/* Catégories en badges */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Catégories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={filters.category === category.id ? "default" : "outline"}
                    className={`cursor-pointer transition-all hover:scale-105 ${filters.category === category.id ? "ring-2 ring-primary/20" : ""}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${category.color}`} />
                    {category.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Tags personnalisés</label>
              <Input
                placeholder="react, typescript, tutorial"
                value={filters.tags.join(", ")}
                onChange={(e) => handleTagChange(e.target.value)}
              />
              {filters.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                disabled={!filters.tags.length && !filters.category}
              >
                Effacer tout
              </Button>
              <div className="text-sm text-muted-foreground">
                {filters.tags.length + (filters.category ? 1 : 0)} filtre(s) actif(s)
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardHeader>
    </Card>
  );
}
