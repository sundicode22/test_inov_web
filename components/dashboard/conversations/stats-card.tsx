import { cn } from "@/lib/utils";

export const StatsCard = ({ 
  icon: Icon, 
  title, 
  value, 
  detail, 
  trend, 
  colorClass, 
  iconBg 
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  detail?: string;
  trend?: string;
  colorClass: string;
  iconBg: string;
}) => (
  <div className={cn("p-4 rounded-xl border space-y-3", colorClass)}>
    <div className="flex items-center justify-between">
      <div className={cn("size-8 rounded-lg flex items-center justify-center", iconBg)}>
        <Icon className="size-4 text-white" />
      </div>
      {trend && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{trend}</span>}
      {!trend && detail && <span className="text-[10px] font-bold text-slate-600">{detail}</span>}
    </div>
    <div className="space-y-1">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
      <div className="text-2xl font-black text-slate-900">{value}</div>
      {detail && trend && <p className="text-[10px] font-medium text-slate-400">{detail}</p>}
    </div>
  </div>
);
