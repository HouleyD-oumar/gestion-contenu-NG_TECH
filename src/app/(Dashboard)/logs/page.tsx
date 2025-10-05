'use client';

import React, { useState } from 'react';
import { Search, Filter, Activity, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { TableSkeleton } from '@/components/ui/SkeletonLoader';
import { useGetActivitiesQuery } from '@/store/api/mockApiSlice';
import { formatDateTime, formatAction, getInitials } from '@/utils/formatters';
import { ActivityAction } from '@/types';

export default function LogsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [action, setAction] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, error } = useGetActivitiesQuery({
    page,
    limit: 20,
    search,
    action: action ? (action as ActivityAction) : undefined,
  });

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'success';
      case 'UPDATE':
        return 'warning';
      case 'DELETE':
        return 'danger';
      case 'LOGIN':
      case 'REGISTER':
        return 'primary';
      case 'LOGOUT':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getActionIcon = (action: string) => {
    return <Activity className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logs d&apos;Activité</h1>
          <p className="text-gray-600 mt-1">
            Historique complet des actions sur la plateforme
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher dans les logs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                Filtres
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <Select
                  label="Type d'action"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  options={[
                    { value: '', label: 'Toutes les actions' },
                    ...Object.values(ActivityAction).map((a) => ({
                      value: a,
                      label: formatAction(a),
                    })),
                  ]}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Période
                  </label>
                  <div className="flex gap-2">
                    <Input type="date" placeholder="Du" />
                    <Input type="date" placeholder="Au" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle>Activités Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <TableSkeleton rows={10} />
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">
                Erreur lors du chargement des logs
              </p>
            </div>
          ) : data && data.data.length > 0 ? (
            <div className="space-y-3">
              {data.data.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getActionIcon(activity.action)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {activity.user.firstName} {activity.user.lastName}
                      </p>
                      <Badge variant="secondary">{activity.user.role}</Badge>
                      <Badge variant={getActionBadgeVariant(activity.action)}>
                        {formatAction(activity.action)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{activity.user.email}</span>
                      {activity.resourceType && (
                        <span className="text-xs">
                          • {activity.resourceType}
                          {activity.resourceId && ` #${activity.resourceId.slice(0, 8)}`}
                        </span>
                      )}
                    </div>

                    {activity.details && (
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.details}
                      </p>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 flex-shrink-0">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDateTime(activity.performedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucune activité trouvée</p>
            </div>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Page {data.page} sur {data.totalPages} ({data.total} activités)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Précédent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === data.totalPages}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
