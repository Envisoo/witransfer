/** @format */

"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, X, Check, Eye } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Badge from "@/components/common/Badge";
import Paginacao from "@/components/common/Paginacao";
import { StatusViatura, Viatura } from "@/types/viatura";
import { mockViaturas } from "@/data/mockViaturas";

type FormData = {
  id?: string;
  matricula: string;
  modelo: string;
  marca: string;
  cor: string;
  ano: number;
  lugares: number;
  arCondicionado: boolean;
  motoristaid: string;
  motoristanome: string;
  status: StatusViatura;
  dataUltimaInspecao: string;
  categoria: string;
};

const Viaturas = () => {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<StatusViatura | "">("");
  const [showForm, setShowForm] = useState(false);
  const [editingViatura, setEditingViatura] = useState<Viatura | null>(null);
  const [formData, setFormData] = useState<FormData>({
    matricula: "",
    modelo: "",
    marca: "",
    cor: "",
    ano: new Date().getFullYear(),
    lugares: 4,
    arCondicionado: true,
    motoristaid: "",
    motoristanome: "",
    status: "ativa",
    dataUltimaInspecao: new Date().toISOString().split("T")[0],
    categoria: "conforto",
  });

  // Mock motoristas for the select
  const mockMotoristas = [
    { id: "1", nome: "João Silva" },
    { id: "2", nome: "Maria Santos" },
    { id: "3", nome: "Carlos Oliveira" },
    { id: "4", nome: "Ana Pereira" },
    { id: "5", nome: "Pedro Costa" },
  ];

  // Filter viaturas based on search and status
  const viaturasFiltradas = mockViaturas.filter((viatura) => {
    const matchesSearch =
      viatura.matricula.toLowerCase().includes(busca.toLowerCase()) ||
      viatura.modelo.toLowerCase().includes(busca.toLowerCase()) ||
      viatura.motoristanome?.toLowerCase().includes(busca.toLowerCase());

    const matchesStatus = statusFiltro ? viatura.status === statusFiltro : true;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const itensPorPagina = 5;
  const totalPaginas = Math.ceil(viaturasFiltradas.length / itensPorPagina);
  const dadosPagina = viaturasFiltradas.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  // Form handling
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save to an API here
    console.log("Form submitted:", formData);

    // Reset form and close
    setShowForm(false);
    setEditingViatura(null);
    setFormData({
      matricula: "",
      modelo: "",
      marca: "",
      cor: "",
      ano: new Date().getFullYear(),
      lugares: 4,
      arCondicionado: true,
      motoristaid: "",
      motoristanome: "",
      status: "ativa",
      dataUltimaInspecao: new Date().toISOString().split("T")[0],
      categoria: "conforto",
    });
  };

  const handleEdit = (viatura: Viatura) => {
    setEditingViatura(viatura);
    setFormData({
      id: viatura.id,
      matricula: viatura.matricula,
      modelo: viatura.modelo,
      marca: viatura.marca,
      cor: viatura.cor,
      ano: viatura.ano,
      lugares: viatura.lugares,
      arCondicionado: viatura.arCondicionado,
      motoristaid: viatura.motoristaid || "",
      motoristanome: viatura.motoristanome || "",
      status: viatura.status,
      dataUltimaInspecao: viatura.dataUltimaInspecao,
      categoria: viatura.categoria,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta viatura?")) {
      // In a real app, you would delete from the API here
      console.log("Deleting viatura with id:", id);
    }
  };

  return (
    <MainLayout titulo="Gestão de Viaturas">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingViatura(null);
            setFormData({
              matricula: "",
              modelo: "",
              marca: "",
              cor: "",
              ano: new Date().getFullYear(),
              lugares: 4,
              arCondicionado: true,
              motoristaid: "",
              motoristanome: "",
              status: "ativa",
              dataUltimaInspecao: new Date().toISOString().split("T")[0],
              categoria: "conforto",
            });
          }}
          className="flex items-center gap-2">
          <Plus size={20} />
          Nova Viatura
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 mb-6 rounded-lg shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Buscar viatura..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPagina(1);
            }}
          />
        </div>

        <select
          value={statusFiltro}
          onChange={(e) => {
            setStatusFiltro(e.target.value as StatusViatura | "");
            setPagina(1);
          }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="">Todas</option>
          <option value="ativa">Ativa</option>
          <option value="inativa">Inativa</option>
          <option value="manutencao">Manutenção</option>
          <option value="inspecao">Inspeção</option>
        </select>
      </div>

      {/* Tabela */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {editingViatura ? "Editar Viatura" : "Nova Viatura"}
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Matrícula *
                </label>
                <Input
                  type="text"
                  name="matricula"
                  value={formData.matricula}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo *
                </label>
                <Input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca *
                </label>
                <Input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cor *
                </label>
                <Input
                  type="text"
                  name="cor"
                  value={formData.cor}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ano *
                </label>
                <Input
                  type="number"
                  name="ano"
                  value={formData.ano}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Lugares *
                </label>
                <Input
                  type="number"
                  name="lugares"
                  value={formData.lugares}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required>
                  <option value="economica">Econômica</option>
                  <option value="conforto">Conforto</option>
                  <option value="premium">Premium</option>
                  <option value="van">Van</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required>
                  <option value="ativa">Ativa</option>
                  <option value="inativa">Inativa</option>
                  <option value="manutencao">Em Manutenção</option>
                  <option value="inspecao">Em Inspeção</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motorista
                </label>
                <select
                  name="motoristaid"
                  value={formData.motoristaid}
                  onChange={(e) => {
                    const selectedMotorista = mockMotoristas.find(
                      (m) => m.id === e.target.value
                    );
                    setFormData((prev) => ({
                      ...prev,
                      motoristaid: e.target.value,
                      motoristanome: selectedMotorista?.nome || "",
                    }));
                  }}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option value="">Selecione um motorista</option>
                  {mockMotoristas.map((motorista) => (
                    <option key={motorista.id} value={motorista.id}>
                      {motorista.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data da Última Inspeção *
                </label>
                <Input
                  type="date"
                  name="dataUltimaInspecao"
                  value={formData.dataUltimaInspecao}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="flex items-center">
                <div className="flex items-center">
                  <input
                    id="arCondicionado"
                    name="arCondicionado"
                    type="checkbox"
                    checked={formData.arCondicionado}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="arCondicionado"
                    className="ml-2 block text-sm text-gray-700">
                    Ar-condicionado
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowForm(false)}
                className="px-4 py-2">
                Cancelar
              </Button>
              <Button type="submit" className="px-4 py-2">
                {editingViatura ? "Atualizar" : "Salvar"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tabela de Viaturas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matrícula
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modelo/Marca
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motorista
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lugares
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ar-condicionado
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dadosPagina.map((viatura) => (
                <tr key={viatura.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {viatura.matricula}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {viatura.modelo}
                    </div>
                    <div className="text-sm text-gray-500">
                      {viatura.marca} - {viatura.cor}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {viatura.motoristanome || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {viatura.lugares} lugares
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {viatura.arCondicionado ? (
                      <span className="inline-flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" /> Sim
                      </span>
                    ) : (
                      <span className="text-gray-500">Não</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        viatura.status === "ativa"
                          ? "bg-green-100 text-green-800"
                          : viatura.status === "inativa"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }>
                      {viatura.status.charAt(0).toUpperCase() +
                        viatura.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/viaturas/${viatura.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Ver detalhes">
                        <Eye size={18} />
                      </Link>
                      <button
                        onClick={() => handleEdit(viatura)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors"
                        title="Editar">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(viatura.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Excluir">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {dadosPagina.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-gray-500">
                    Nenhuma viatura encontrada com os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {viaturasFiltradas.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200">
            <Paginacao
              paginaAtual={pagina}
              totalPaginas={totalPaginas}
              onMudarPagina={setPagina}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Viaturas;
