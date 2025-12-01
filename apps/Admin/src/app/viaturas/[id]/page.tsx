/** @format */

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Car,
  Calendar,
  Users,
  AlertTriangle,
  Gauge,
  Check,
  X,
  Clock,
} from "lucide-react";

import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Badge from "@/components/common/Badge";
import { Viatura, StatusViatura, CategoriaViatura } from "@/types/viatura";
import { mockViaturas } from "@/data/mockViaturas";

const DetalheViatura = () => {
  const router = useRouter();
  const params = useParams();
  const viaturaId = params.id as string;
  
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [viatura, setViatura] = useState<Viatura | null>(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    // Simular carregamento assíncrono
    const timer = setTimeout(() => {
      try {
        const viaturaEncontrada = mockViaturas.find(v => v.id === viaturaId);
        if (viaturaEncontrada) {
          setViatura(viaturaEncontrada);
          setErro(null);
        } else {
          setErro("Viatura não encontrada");
        }
      } catch (err) {
        setErro("Erro ao carregar os dados da viatura");
      } finally {
        setCarregando(false);
      }
    }, 500); // Pequeno delay para simular carregamento

    return () => clearTimeout(timer);
  }, [viaturaId]);

  

  const getStatusBadgeVariant = (status: StatusViatura) => {
    switch (status) {
      case "ativa":
        return "default";
      case "inativa":
        return "destructive";
      case "manutencao":
        return "outline";
      case "inspecao":
        return "secondary";
      default:
        return "default";
    }
  };

  const getCategoriaLabel = (categoria: CategoriaViatura) => {
    const categorias = {
      economica: "Econômica",
      conforto: "Conforto",
      premium: "Premium",
      van: "Van",
    };
    return categorias[categoria] || categoria;
  };

  if (carregando) {
    return (
      <MainLayout titulo="Carregando...">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </MainLayout>
    );
  }

  if (erro || !viatura) {
    return (
      <MainLayout titulo="Erro ao carregar viatura">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {erro || "Não foi possível carregar os dados da viatura."}
              </p>
            </div>
          </div>
        </div>
        <Button onClick={() => router.push("/viaturas")}>
          <ArrowLeft size={16} className="mr-2" /> Voltar para Viaturas
        </Button>
      </MainLayout>
    );
  }

  return (
    <MainLayout titulo={`Viatura ${viatura.matricula}`}>
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => router.push("/viaturas")}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 border border-teal-600 hover:bg-teal-50 rounded-lg px-4 py-2 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar para Viaturas
        </Button>
        <Button 
          onClick={() => setEditando(!editando)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Edit size={16} />
          {editando ? 'Cancelar Edição' : 'Editar Viatura'}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Informações Gerais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Matrícula</p>
                <p className="font-medium">{viatura.matricula}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Marca</p>
                <p className="font-medium">{viatura.marca}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Modelo</p>
                <p className="font-medium">{viatura.modelo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ano</p>
                <p className="font-medium">{viatura.ano}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cor</p>
                <p className="font-medium">{viatura.cor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Categoria</p>
                <p className="font-medium">{getCategoriaLabel(viatura.categoria)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge variant={getStatusBadgeVariant(viatura.status)}>
                  {viatura.status.charAt(0).toUpperCase() + viatura.status.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ar Condicionado</p>
                <p className="font-medium">
                  {viatura.arCondicionado ? (
                    <span className="text-green-600 flex items-center">
                      <Check className="w-4 h-4 mr-1" /> Sim
                    </span>
                  ) : (
                    <span className="text-gray-500 flex items-center">
                      <X className="w-4 h-4 mr-1" /> Não
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Histórico de Manutenção</h2>
            <div className="space-y-4">
              {viatura.historico && viatura.historico.length > 0 ? (
                viatura.historico.map((item: { id: string; titulo: string; data: string; descricao: string; custo: number; quilometragem: number; tipo: string }) => (
                  <div
                    key={item.id}
                    className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.titulo}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(item.data).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.descricao}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          Custo: R$ {item.custo.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Quilometragem: {item.quilometragem.toLocaleString()} km
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.tipo === "manutencao" ? "default" : "outline"
                        }>
                        {item.tipo === "manutencao"
                          ? "Manutenção"
                          : "Inspeção"}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Nenhum histórico de manutenção registrado.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Estatísticas</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total de Viagens</p>
                  <p className="font-semibold">{viatura.numeroViagens || 0}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quilometragem</p>
                  <p className="font-semibold">
                    {viatura.kilometragem?.toLocaleString() || 0} km
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Última Atualização</p>
                  <p className="font-semibold">
                    {new Date(viatura.ultimaAtualizacao).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Motorista</h2>
            {viatura.motoristaid ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{viatura.motoristanome}</p>
                  <p className="text-sm text-gray-500">Motorista</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Nenhum motorista atribuído</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Última Inspeção</h2>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">
                  {viatura.dataUltimaInspecao
                    ? new Date(viatura.dataUltimaInspecao).toLocaleDateString("pt-BR")
                    : "Nenhuma inspeção registrada"}
                </p>
                <p className="text-sm text-gray-500">Data da última inspeção</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {editando && (
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Editar Viatura</h2>
          <p className="text-gray-500 mb-4">
            A funcionalidade de edição não está disponível no modo de demonstração.
          </p>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setEditando(false)} 
              className="px-4 py-2"
            >
              Cancelar
            </Button>
            <Button disabled className="px-4 py-2">
              Salvar Alterações
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DetalheViatura;
