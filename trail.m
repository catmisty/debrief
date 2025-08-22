mat = load('687200403251247.mat');
required_params = {'TAS', 'PTCH', 'ROLL', 'MACH', 'AOA1', 'WOW', 'AOA2' ,'LATP',...
                   'A_T', 'TRK', 'LOC', ...
                   'LATG', 'LONG', 'TAT', 'LGUP', 'LGDN', 'DA', 'DATE_DAY'};

% Use TAS as the reference for length
ref_param = 'TAS';
ref_len = length(mat.(ref_param).data);

all_data = [];

for i = 1:length(required_params)
    param = required_params{i};

    % Check if the field exists
    if isfield(mat, param)
        param_data = mat.(param);

        % Extract .data if it's a struct
        if isstruct(param_data) && isfield(param_data, 'data')
            values = param_data.data;
        else
            values = param_data;
        end

        % Resize if needed
        len = length(values);
        if len < ref_len
            % Pad with NaNs
            values(end+1:ref_len, 1) = NaN;
        elseif len > ref_len
            % Trim to reference length
            values = values(1:ref_len);
        end
    else
        % Fill with NaNs if parameter is missing
        values = NaN(ref_len, 1);
        warning('Missing param: %s', param);
    end

    all_data = [all_data, values];
end

% Create table
T = array2table(all_data, 'VariableNames', required_params);

% Save to CSV
writetable(T, 'C:\Users\saart\Desktop\extracted_data_fixed.csv');
