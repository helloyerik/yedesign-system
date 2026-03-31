import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";
import { PhPencilSimple, PhTrash } from "@phosphor-icons/vue";
import Table from "@components/blocks/Table/Table";
import type { TableColumn } from "@components/blocks/Table/Table";

interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  email: string;
}

const sampleData: Employee[] = [
  { id: "1", name: "Алексей Иванов", department: "Разработка", role: "Frontend", email: "a.ivanov@mechta.kz" },
  { id: "2", name: "Мария Петрова", department: "Дизайн", role: "UI/UX", email: "m.petrova@mechta.kz" },
  { id: "3", name: "Дмитрий Сидоров", department: "Маркетинг", role: "SMM", email: "d.sidorov@mechta.kz" },
  { id: "4", name: "Анна Козлова", department: "Разработка", role: "Backend", email: "a.kozlova@mechta.kz" },
  { id: "5", name: "Борис Новиков", department: "HR", role: "Рекрутер", email: "b.novikov@mechta.kz" },
];

const columns: TableColumn<Employee>[] = [
  {
    id: "name",
    header: "Имя",
    cell: (row) => h("span", { style: { fontWeight: 600 } }, row.name),
    width: "200px",
    sortable: true,
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
  {
    id: "department",
    header: "Отдел",
    cell: (row) => row.department,
    sortable: true,
    sortFn: (a, b) => a.department.localeCompare(b.department),
  },
  { id: "role", header: "Роль", cell: (row) => row.role },
  {
    id: "email",
    header: "Email",
    cell: (row) => h("span", { style: { color: "var(--mi-color-brand-text-link)" } }, row.email),
  },
];

const meta = {
  title: "Blocks/Table",
  component: Table,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return { sampleData, columns };
    },
    template: `
      <Table
        :data="sampleData"
        :columns="columns"
        :get-row-id="(row) => row.id"
      />
    `,
  }),
};

export const WithSelection: Story = {
  render: () => ({
    components: { Table },
    setup() {
      const selected = ref<string[]>([]);
      return { sampleData, columns, selected };
    },
    template: `
      <Table
        :data="sampleData"
        :columns="columns"
        :get-row-id="(row) => row.id"
        selectable
        :selected-ids="selected"
        :on-selection-change="(ids) => selected = ids"
      />
    `,
  }),
};

export const WithActions: Story = {
  render: () => ({
    components: { Table },
    setup() {
      const selected = ref<string[]>([]);
      return {
        sampleData,
        columns,
        selected,
        actions: [
          {
            label: "Редактировать",
            icon: h(PhPencilSimple, { size: 16 }),
            onClick: () => undefined,
          },
          {
            label: "Удалить",
            icon: h(PhTrash, { size: 16 }),
            onClick: () => undefined,
            theme: "danger" as const,
          },
        ],
      };
    },
    template: `
      <Table
        :data="sampleData"
        :columns="columns"
        :get-row-id="(row) => row.id"
        selectable
        :selected-ids="selected"
        :on-selection-change="(ids) => selected = ids"
        :actions="actions"
      />
    `,
  }),
};

export const Empty: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return { columns };
    },
    template: `
      <Table
        :data="[]"
        :columns="columns"
        :get-row-id="(row) => row.id"
      />
    `,
  }),
};
