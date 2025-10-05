"use client";

import { Content } from "../../types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CalendarDays, User, Eye } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { UserService } from "../../services/userService";

interface ContentCardProps {
  content: Content;
  onViewMore?: (content: Content) => void;
}

export default function ContentCard({ content, onViewMore }: ContentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getInitials = (authorId: string) => {
    return UserService.getUserInitials(authorId);
  };

  const getAuthorName = (authorId: string) => {
    return UserService.getUserFullName(authorId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleViewMore = () => {
    if (onViewMore) {
      onViewMore(content);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  // Extrait de 100-150 caractères comme spécifié dans le ticket Trello
  const shouldTruncate = content.description && content.description.length > 100;
  const displayDescription = isExpanded || !shouldTruncate
    ? content.description
    : content.description?.slice(0, 100) + "...";

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        {/* Image */}
        {content.image && !imageError && (
          <div className="aspect-video w-full mb-3 rounded-md overflow-hidden bg-muted relative">
            <Image
              src={content.image}
              alt={content.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        )}

        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold leading-tight line-clamp-2">
              {content.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage src="" alt={getAuthorName(content.authorId)} />
                <AvatarFallback className="text-xs">
                  {getInitials(content.authorId)}
                </AvatarFallback>
              </Avatar>
              <span className="flex items-center">
                <User className="mr-1 h-3 w-3" />
                {getAuthorName(content.authorId)}
              </span>
              <span className="flex items-center">
                <CalendarDays className="mr-1 h-3 w-3" />
                {formatDate(content.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Catégorie */}
        <Badge variant="secondary" className="capitalize">
          {content.category}
        </Badge>

        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {content.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {content.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{content.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Description avec extrait 100-150 caractères */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {displayDescription}
          </p>

          {shouldTruncate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewMore}
              className="h-auto p-0 text-primary hover:text-primary/80"
            >
              <Eye className="mr-1 h-3 w-3" />
              {isExpanded ? "Réduire" : "Voir plus"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
